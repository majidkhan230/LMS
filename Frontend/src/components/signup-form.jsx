import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { postReq } from "@/api/axios"

export function SignupForm({
  className,
  ...props
}) {


  const navigate = useNavigate()
  



  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit =async (data) => {
    console.log(data)
   const res  = await postReq('/auth/register',data)
    console.log(res)
    const userData = res?.data?.user
    if(userData){
      navigate('/home')
    }

  }
  return (


    
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Signup</CardTitle>
          <CardDescription>
            Enter below inputs to signup to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form  onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="fullName">FullName</Label>
              <Input id="fullName" type="fullName" placeholder="fullName" {...register("fullName")}  />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" {...register("email")}  />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" {...register("password")} />
              </div>
              <Button type="submit" className="w-full">
                Signup
              </Button>
              <Button variant="outline" className="w-full">
                Signup with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to={'/'} className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>)
  );
}
