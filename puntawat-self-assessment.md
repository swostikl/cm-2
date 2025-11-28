# Self-Assessment

## 1. Testing

During the testing of the signup endpoint, I initially encountered persistent failures. I assumed there was a logic error in the controller because the request kept being rejected.

But instead it was that the password wasn't strong enough, and the code doesn't show enough debugging or alert the user.

```javascript
if (!response.ok) {
  console.error(response);
  throw new Error("response not ok");
}
```

**Lesson Learned:**
To write better debugging and also show sign up errors to the user next time.

## 2. Collaboration

When the backend was unfinished, we communicated and waited for them to finish.

## 3. Authentication

In the backend there is a middleware for authentication, even though the tasks did not say that I have to do the authentication for the endpoint, but I figured it out and add authentication.
