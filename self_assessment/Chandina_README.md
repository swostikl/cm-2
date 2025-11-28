FrontEnd SelfAssessment - Login and Authentication (Chandina)  

Me Chandina and Puntawat worked on the frontend.  
For the iteration 3 we have wait for the backend team to complete their task. We communicated with each other and completed the task  
At first, my login logic was written directly inside the LoginPage.jsx component.
While functional, it mixed UI and authentication logic, which made the code harder to reuse, test, and maintain.  

Issues With the Initial Code  
- UI and authentication logic were tightly mixed together.  
- Harder to maintain and harder to test.  
- Component became too large, reducing readability.  

To fix these issues, I refactored the authentication logic into a reusable custom hook called useLogin.  


import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error } = useLogin();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const success = await login(email, password);

    ..........

3. Updated LoginPage Using the Hook

    // LoginPage.jsx (updated)
const { login, loading, error } = useLogin();

async function handleSubmit(e) {
  e.preventDefault();
  const success = await login(email, password);
  if (success) navigate("/");
}

Working on the authentication feature helped me understand how secure login flows rely on clean API communication and proper state management. Implementing the useLogin hook also gave me practical experience in handling tokens, errors, and loading states in a real-world frontend authentication setup.  

Key Improvements  

- Separation of concerns: UI handles display, hook handles logic.  

- Reusability: The login logic can now be reused in other components.  

- Cleaner code: LoginPage.jsx is much easier to understand.  

- Better error and loading handling: Managed entirely in the hook.  

- Professional structure: Matches industry standards for React apps.  

Lessons Learned  

- Custom hooks make React components more modular and maintainable.  

- Separating business logic from UI improves readability and organization.  

- Handling loading and error states inside hooks keeps the component clean.  

- Refactoring improves the long-term quality of the codebase.  

This task helped me understand how custom hooks improve structure and maintainability in React applications. I also gained confidence in separating UI and logic, which will help me build more scalable frontend features in future projects.  