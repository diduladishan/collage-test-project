import React from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {
  SignInContainer,
  Form,
  Title,
  Input,
  Button,
  CancelButton,
} from "../Components"

const SignInForm = ({ signIn, toggle }) => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const handleSignIn = async (data) => {
    try {
      const response = await axios.post(
        "https://meme-backend-iota.vercel.app/auth/login",
        {
          email: data.email,
          password: data.password,
        }
      )

      if (response.status === 200) {
        navigate("/auth") // Navigate to the dashboard after successful login
      }
    } catch (error) {
      console.error("Error during login:", error)
      alert("Login failed. Please check your credentials.")
    }
  }

  const handleCancel = () => {
    reset() // Reset the form when cancel is clicked
  }

  return (
    <SignInContainer signinIn={signIn}>
      <Form onSubmit={handleSubmit(handleSignIn)}>
        <Title>Sign In</Title>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}

        <Input
          type="password"
          name="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && <p className="text-red-600">{errors.password.message}</p>}

        <Button type="submit">Sign In</Button>
        <CancelButton type="button" onClick={handleCancel}>
          Cancel
        </CancelButton>
      </Form>
    </SignInContainer>
  )
}

export default SignInForm
