'use client'

import { useState } from "react"
import { 
  signInWithPhoneNumber, 
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"
import { auth, db } from "@/app/firebase/config"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { useAuth } from "@/app/context/AuthContext"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function LoginDialog() {
  const [open, setOpen] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [authMethod, setAuthMethod] = useState("email") // "email" or "phone"
  const { user } = useAuth()
  
  // Email/Password states
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // If user is logged in, show user info instead of login button
  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-gray-700">{user.email || user.phoneNumber}</span>
        <Button
          variant="outline"
          onClick={() => {
            auth.signOut();
            toast.success('Logged out successfully!');
          }}
        >
          Logout
        </Button>
      </div>
    );
  }
  
  // Phone states
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [showOTP, setShowOTP] = useState(false)
  
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [error, setError] = useState(null)

  // Generate RecaptchaVerifier
  const generateRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        callback: () => {
          handleSendOTP();
        },
        'expired-callback': () => {
          toast.error("reCAPTCHA expired. Please try again.");
        }
      });
    }
  }

  // Handle phone number verification
  const handleSendOTP = async (e) => {
    if (e) e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error("Please enter a valid 10-digit phone number")
      return
    }

    setLoading(true)
    
    try {
      if (!window.recaptchaVerifier) {
        generateRecaptcha();
      }

      const formattedPhoneNumber = '+91' + phoneNumber.replace(/\D/g, '') // Add country code and remove non-digits
      const appVerifier = window.recaptchaVerifier;
      
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
      window.confirmationResult = confirmationResult;
      setShowOTP(true)
      
      toast.success("OTP sent to your phone number")
    } catch (error) {
      console.error('Error sending OTP:', error);
      if (error.code === 'auth/invalid-phone-number') {
        toast.error("Invalid phone number format. Please check and try again.")
      } else if (error.code === 'auth/too-many-requests') {
        toast.error("Too many attempts. Please try again later.")
      } else {
        toast.error("Error sending OTP. Please try again.")
      }
      
      // Reset reCAPTCHA on error
      window.recaptchaVerifier?.reset();
      window.recaptchaVerifier = null;
    } finally {
      setLoading(false)
    }
  }

  // Handle OTP verification
  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    
    if (!verificationCode || verificationCode.length < 6) {
      toast.error("Please enter a valid verification code")
      return
    }

    setLoading(true)
    
    try {
      const result = await window.confirmationResult.confirm(verificationCode)
      const user = result.user
      
      // Store user data in Firestore
      await storeUserData(user)
      
      toast.success("Successfully logged in!")
      setOpen(false)
    } catch (error) {
      toast.error("Invalid verification code")
    } finally {
      setLoading(false)
    }
  }

  // Reset state when dialog closes
  const handleOpenChange = (open) => {
    if (!open) {
      setShowOTP(false)
      setPhoneNumber("")
      setVerificationCode("")
    }
    setOpen(open)
  }

  // Function to store user data in Firestore
  const storeUserData = async (user) => {
    try {
      const userRef = doc(db, 'users', user.uid)
      const userSnap = await getDoc(userRef)
      
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          phoneNumber: user.phoneNumber,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        })
      } else {
        await setDoc(userRef, {
          lastLogin: serverTimestamp()
        }, { merge: true })
      }
    } catch (error) {
      console.error('Error storing user data:', error)
      toast.error('Error updating profile')
    }
  }

  // Handle email/password sign in
  const handleEmailSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null) // Clear previous errors

    try {
      if (!email || !password) {
        throw new Error("Please fill in all fields")
      }
      
      const result = await signInWithEmailAndPassword(auth, email, password)
      const user = result.user
      
      await storeUserData(user)
      toast.success(`Welcome back ${user.email}!`)
      setOpen(false)
    } catch (error) {
      const errorMessage = {
        'auth/user-not-found': 'No account found with this email',
        'auth/wrong-password': 'Incorrect password',
        'auth/invalid-email': 'Invalid email format',
        'auth/too-many-requests': 'Too many attempts. Please try again later'
      }[error.code] || error.message
      
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Handle email/password sign up
  const handleEmailSignUp = async (e) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      const user = result.user
      
      await storeUserData(user)
      
      toast.success("Account created successfully!", {
        position: "bottom-right",
        duration: 3000
      })
      setOpen(false)
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-right", 
        duration: 3000
      })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setPhoneNumber("")
    setVerificationCode("")
    setShowOTP(false)
    setLoading(false)
  }

  // Add logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth)
      toast.success("Logged out successfully")
      setShowDropdown(false)
    } catch (error) {
      toast.error("Error logging out")
    }
  }

  return (
    <>
      {user ? (
        <div className="relative">
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="h-8 w-8 flex items-center justify-center">
              {user.email ? user.email[0].toUpperCase() : user.phoneNumber?.slice(-2)}
            </div>
            <span className="font-medium">
              {user.email || user.phoneNumber}
            </span>
          </Button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Dialog open={open} onOpenChange={handleOpenChange} className="sr-only">
          <DialogTrigger asChild>
            <Button variant="outline" className="font-medium">Login</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl">
            <Card className="border-0 shadow-none">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold">
                  {isSignUp ? "Create Account" : "Welcome Back"}
                </CardTitle>
                <CardDescription>
                  {isSignUp ? "Sign up to get started" : "Sign in to continue"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <Tabs defaultValue="email" className="w-full" onValueChange={setAuthMethod}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="phone">Phone</TabsTrigger>
                  </TabsList>

                  <TabsContent value="email" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      {isSignUp && (
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      )}
                      <Button
                        className="w-full"
                        onClick={isSignUp ? handleEmailSignUp : handleEmailSignIn}
                        disabled={loading}
                      >
                        {loading ? "Please wait..." : (isSignUp ? "Sign Up" : "Sign In")}
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="phone" className="space-y-4 mt-4">
                    {!showOTP ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            maxLength={10}
                          />
                        </div>
                        <Button 
                          className="w-full"
                          onClick={handleSendOTP}
                          disabled={loading}
                        >
                          {loading ? "Sending..." : "Get Verification Code"}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="otp">Verification Code</Label>
                          <Input
                            id="otp"
                            type="text"
                            placeholder="Enter 6-digit code"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            className="text-center text-xl tracking-widest"
                            maxLength={6}
                          />
                        </div>
                        <Button
                          className="w-full"
                          onClick={handleVerifyOTP}
                          disabled={loading}
                        >
                          {loading ? "Verifying..." : "Verify & Login"}
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex-col space-y-2 text-center">
                <p className="text-sm text-gray-500">
                  {authMethod === "phone" && showOTP ? (
                    <>
                      Didn't receive the code?{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto font-normal"
                        onClick={() => {
                          setShowOTP(false)
                          setVerificationCode("")
                        }}
                      >
                        Try again
                      </Button>
                    </>
                  ) : (
                    <>
                      {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto font-normal"
                        onClick={() => {
                          setIsSignUp(!isSignUp)
                          resetForm()
                        }}
                      >
                        {isSignUp ? "Sign In" : "Sign Up"}
                      </Button>
                    </>
                  )}
                </p>
              </CardFooter>
            </Card>
            <div id="recaptcha-container"></div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}