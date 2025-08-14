import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { userStoreData } from "../store/userData";
import { useNavigate } from "@tanstack/react-router";
import { baseURL } from "../config/api";

const LoginPage = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const loginUser = async (formData) => {
    const { data } = await axios.post(`${baseURL}/user`, formData);
    return data;
  };

  const { setUserData } = userStoreData();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login success:", data);
      setUserData({ userName: data?.data?.userName, id: data?.data?._id });
      navigate({ to: "/dashboard" });
    },
    onError: (error) => {
      console.error("Login failed:", error.response?.data || error.message);
    },
  });
  console.log(mutation.isPending, "sdfsfsfsfsdfsf");

  const onSubmit = (formData) => {
    mutation.mutate({
      userName: formData.username,
      password: formData.password,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <Controller
              name="username"
              control={control}
              rules={{ required: "Username is required" }}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className={`w-full px-4 py-2 border ${
                      fieldState.error ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    id="password"
                    type="text"
                    placeholder="Enter your password"
                    className={`w-full px-4 py-2 border ${
                      fieldState.error ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-black focus:outline-none focus:ring-2"
          >
            {mutation?.isPending ? "loading..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          <b>Note:</b> You can use the same username and password to access an
          existing component. Changing either the username, the password, or
          both will create a new user account.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
