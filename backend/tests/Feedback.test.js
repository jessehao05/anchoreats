import { describe, it, expect } from 'vitest';
import Feedback from '../src/models/Feedback.js';

// Test Feedback model
describe('Feedback Model Validation', () => {
  it('should create valid feedback successfully', async () => {
    const validFeedback = {
      text: 'asdfasdf',
      author: 'Hi Hi',
      email: 'hi@me.com'
    };

    const feedback = await Feedback.create(validFeedback);

    expect(feedback._id).toBeDefined();
    expect(feedback.text).toBe('asdfasdf');
    expect(feedback.author).toBe('Hi Hi');
    expect(feedback.email).toBe('hi@me.com');
    expect(feedback.createdAt).toBeDefined();
  });

  it('should create feedback with only required text field', async () => {
    const minimalFeedback = {
      text: 'only text'
    };

    const feedback = await Feedback.create(minimalFeedback);

    expect(feedback._id).toBeDefined();
    expect(feedback.text).toBe('only text');
    expect(feedback.author).toBeUndefined();
    expect(feedback.email).toBeUndefined();
  });

  it('should create feedback without author', async () => {
    const feedbackNoAuthor = {
      text: 'this is a test without author',
      email: 'zoink@gmail.co'
    };

    const feedback = await Feedback.create(feedbackNoAuthor);

    expect(feedback._id).toBeDefined();
    expect(feedback.text).toBe('this is a test without author');
    expect(feedback.author).toBeUndefined();
    expect(feedback.email).toBe('zoink@gmail.co');
  });

  it('should create feedback without email', async () => {
    const feedbackNoEmail = {
      text: 'feedback without email',
      author: 'Daniel Diermeier'
    };

    const feedback = await Feedback.create(feedbackNoEmail);

    expect(feedback._id).toBeDefined();
    expect(feedback.text).toBe('feedback without email');
    expect(feedback.author).toBe('Daniel Diermeier');
    expect(feedback.email).toBeUndefined();
  });

  it('should fail validation when text is missing', async () => {
    const invalidFeedback = {
      author: 'John Doe',
      email: 'john@example.com'
    };

    await expect(Feedback.create(invalidFeedback)).rejects.toThrow();
  });

  it('should fail validation when text is empty string', async () => {
    const invalidFeedback = {
      text: '',
      author: 'John Doe',
      email: 'john@example.com'
    };

    await expect(Feedback.create(invalidFeedback)).rejects.toThrow();
  });
});
