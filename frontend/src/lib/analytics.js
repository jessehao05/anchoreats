import { api } from "./axios";

const getSessionId = () => {
    let id = sessionStorage.getItem("sessionId");
    if (!id) {
        id = crypto.randomUUID();
        sessionStorage.setItem("sessionId", id);
    }
    return id;
};

export const logPageView = async (page) => {
    try {
        await api.post("/analytics", {
            page,
            referrer: document.referrer,
            sessionId: getSessionId(),
        });
    } catch {
        // silently fail — analytics should never break the app
    }
};
