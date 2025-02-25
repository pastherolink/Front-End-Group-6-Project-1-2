import React from 'react';

const AuthForm = () => {
  return (
    <section id="auth">
      <h2>Login/Register</h2>
      <form id="auth-form">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Login/Register</button>
      </form>
    </section>
  );
};

export default AuthForm;