/** @format */

import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <main className='flex min-h-screen items-center justify-center px-6 pt-16'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold'>Login</h1>
        <p className='mt-3 text-base-content/60'>
          Don&apos;t have an account?{" "}
          <Link to='/signup' className='link link-primary'>
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
