import {useForm} from "react-hook-form";
import {useAuth} from "../../hooks/useAuth";
import {checkPasswordSecurity} from "../../../../shared/utils/checkPasswordSecurity";
import {Link} from "react-router";

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors,isSubmitting},
  } = useForm<RegisterFormData>();

  const password = watch("password");
  const passwordcheck = checkPasswordSecurity(password);
 
  const {register: registerUser} = useAuth();

  return (
    <section className="flex min-h-screen items-center justify-center bg-(--bg) px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-(--border) bg-(--surface) p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-(--foreground)">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-(--muted)">
            Register to get started with Stremmer.
          </p>
        </div>
        <form
          className="space-y-5"
          onSubmit={handleSubmit(registerUser)}
          noValidate
        >
          <div>
            <label
              className="mb-1 block text-sm font-medium text-(--foreground)"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              className="w-full rounded-lg border border-(--border) bg-(--bg) px-3 py-2.5 text-(--foreground) outline-none transition placeholder:text-(--muted) focus:border-(--primary) focus:ring-2 focus:ring-(--primary)"
              placeholder="Your username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-(--primary)">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="mb-1 block text-sm font-medium text-(--foreground)"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-lg border border-(--border) bg-(--bg) px-3 py-2.5 text-(--foreground) outline-none transition placeholder:text-(--muted) focus:border-(--primary) focus:ring-2 focus:ring-(--primary)"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-(--primary)">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="mb-1 block text-sm font-medium text-(--foreground)"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              className="w-full rounded-lg border border-(--border) bg-(--bg) px-3 py-2.5 text-(--foreground) outline-none transition placeholder:text-(--muted) focus:border-(--primary) focus:ring-2 focus:ring-(--primary)"
              placeholder="At least 8 characters"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {passwordcheck && (
              <p className="mt-1 text-sm text-(--primary)">{passwordcheck}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-(--primary) px-4 py-2.5 font-semibold text-white transition hover:bg-(--primary-hover) focus:outline-none focus:ring-2 focus:ring-(--primary)"
            disabled={isSubmitting}
          >
            {isSubmitting?'...':'Register'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-(--muted)">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-semibold text-(--primary) hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
