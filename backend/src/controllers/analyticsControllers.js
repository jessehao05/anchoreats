import PageView from "../models/PageView.js";

const BOT_PATTERN = /bot|crawler|spider|crawling|slurp|yandex|baidu|duckduck|facebookexternalhit|ia_archiver/i;

export const authenticate = (req, res) => {
    const { username, password } = req.body;
    if (
        username === process.env.ANALYTICS_USERNAME &&
        password === process.env.ANALYTICS_PASSWORD
    ) {
        return res.status(200).json({ success: true, token: process.env.ANALYTICS_SECRET });
    }
    res.status(401).json({ success: false, message: "Invalid credentials." });
};

export const logPageView = async (req, res) => {
    try {
        const userAgent = req.headers["user-agent"] || "";

        if (BOT_PATTERN.test(userAgent)) {
            return res.status(200).json({ success: true });
        }

        const { page, referrer, sessionId } = req.body;

        if (!page) {
            return res.status(400).json({ success: false, message: "Page is required." });
        }

        await new PageView({ page, referrer, userAgent, sessionId }).save();

        res.status(201).json({ success: true });
    } catch (error) {
        console.error("Error in logPageView controller:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

export const getAnalytics = async (req, res) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || authHeader !== `Bearer ${process.env.ANALYTICS_SECRET}`) {
        return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    try {
        const [totalViews, sessionIds, byPage, byDay, byMonth] = await Promise.all([
            PageView.countDocuments(),
            PageView.distinct("sessionId"),
            PageView.aggregate([
                { $group: { _id: "$page", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
            ]),
            PageView.aggregate([
                { $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 },
                }},
                { $sort: { _id: 1 } },
            ]),
            PageView.aggregate([
                { $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    count: { $sum: 1 },
                }},
                { $sort: { _id: 1 } },
            ]),
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalViews,
                uniqueSessions: sessionIds.length,
                byPage,
                byDay,
                byMonth,
            },
        });
    } catch (error) {
        console.error("Error in getAnalytics controller:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};
