import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as z from "zod";
import { Lock } from "lucide-react";
import { Label } from "components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card";
import CustomForm from "@/components/CustomForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must contain at least 8 characters"),
}).refine((data) => regex.test(data.password), {
  message: "Password must contain at least 1 number and both lower and uppercase letters and a special character.",
  path: ["password"],
});

const Login = () => {
  const navigate = useNavigate();
  const defaultValues = {
    email: "",
    password: "",
  };
  const [loading, setLoading] = useState(false);

  const notifySuccess = () => toast.success("Login successful!");
  const notifyError = (error: any) => toast.error(`Login failed: ${error}`);

  const onSubmit = async (user: any) => {
    try {
      setLoading(true);

      const response = await axios.post('http://localhost:5000/api/auth/login', user);

      const { token } = response.data;
      localStorage.setItem('token', token);

      notifySuccess(); // Show success toast
      console.log('Login successful');
      navigate('/');
    } catch (error) {
      notifyError(error); // Show error toast
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const FormFields = [
    { name: "email", display: "Email", placeholder: "example@gmail.com", type: "email" },
    { name: "password", display: "Password", placeholder: "*******", type: "password" },
  ];

  const handleGoogleSignIn = async () => {
    try {

      window.location.href = 'http://localhost:5000/api/auth/auth/google';
    } catch (error) {
      notifyError(error);
      console.error('Login with Google failed:', error);
    }
  };


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log("token", token)
    if (token) {

      localStorage.setItem('token', token);
      notifySuccess();
      console.log('Login with Google successful');
      navigate('/');
    }
  }, [navigate]);


  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-[500px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Log in to your account</CardTitle>
          <CardDescription>
            Enter your email & password to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <CustomForm
            FormFields={FormFields}
            defaultValues={defaultValues}
            formSchema={formSchema}
            loading={loading}
            submitButtonText="Sign in"
            submitIcon={<Lock className="mr-2 w-4 h-4" />}
            onSubmit={onSubmit}
            elementBefore={
              <div className="flex items-center space-x-2 py-2">
                <Label htmlFor="forgotPassword">
                  <Link to='#' className="hover:underline underline-offset-2">
                    Forgot Password?
                  </Link>
                </Label>
              </div>
            }
          />
          <button onClick={handleGoogleSignIn} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Sign in with Google
          </button>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p>Don't have an account? <Link to='/register' className="text-primary underline font-semibold">Register.</Link></p>
        </CardFooter>
      </Card>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default Login;
