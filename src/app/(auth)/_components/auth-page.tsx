import RegisterForm from "./register-form";
import LoginForm from "./login-form";

interface RegisterOrLoginInterface {
  registerOrLogin: "register" | "login";
}

export default function AuthPage({
  registerOrLogin,
}: RegisterOrLoginInterface) {
  return (
    <div className="py-12 bg-white container relative flex-col items-center justify-center max-h-screen rounded-lg md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 lg:p-0">
      <div className="relative hidden h-full flex-col bg-muted text-white dark:border-r lg:flex">
        <img
          className="h-full w-full rounded-lg"
          src="/book-img.jpg"
          alt="Books image"
        />
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {registerOrLogin === "register" ? "Register" : "Login"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your information below to{" "}
              {registerOrLogin === "register" ? "create an " : "access your "}
              account
            </p>
          </div>
          {registerOrLogin === "register" ? <RegisterForm /> : <LoginForm />}
        </div>
      </div>
    </div>
  );
}
