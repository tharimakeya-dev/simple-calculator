# 💾 Browser Storage: localStorage vs sessionStorage vs Cookies

There are 3 main ways to store user data in the browser:

---

| Feature | localStorage | sessionStorage | Cookies |
| :--- | :--- | :--- | :--- |
| **Lifetime** | Persists until manually cleared | Until the tab (window) is closed | Until the set Expire time passes |
| **Size** | ~5-10 MB | ~5 MB | ~4 KB |
| **Sent to the server?** | No | No | Yes (sent with every HTTP request) |
| **Security** | Vulnerable to XSS attacks | Vulnerable to XSS attacks | Can be protected from XSS with the `HttpOnly` flag |
