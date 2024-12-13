import React from "react";
import { Card, CardHeader, CardContent } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { FaRegLightbulb } from "react-icons/fa6";
import { RiFolderShield2Fill } from "react-icons/ri";
import { LuGlobeLock } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.auth.authUser);
  console.log(user)
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Decentralized University
        </h1>
        <p className="text-lg text-muted-foreground">
          Empowering knowledge and secure file management for a decentralized future.
        </p>
        {/* Show "Get Started" button only if user is not logged in */}
        {user!==null && (
          <Button className="mt-6" onClick={() => navigate("/view")}>Get Started</Button>
        )}
      </div>

      <Separator className="my-8 w-full max-w-3xl" />

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
        <Card className="text-center p-6">
          <CardHeader>
            <FaRegLightbulb size={32} className="mx-auto text-primary mb-2" />
            <h3 className="text-xl font-semibold">Innovative Learning</h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Access a decentralized platform that ensures secure and transparent education resources.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center p-6">
          <CardHeader>
            <RiFolderShield2Fill size={32} className="mx-auto text-primary mb-2" />
            <h3 className="text-xl font-semibold">Secure File Storage</h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Store and manage your academic files with cutting-edge decentralized technology.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center p-6">
          <CardHeader>
            <LuGlobeLock size={32} className="mx-auto text-primary mb-2" />
            <h3 className="text-xl font-semibold">Global Access</h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Collaborate and connect with peers globally in a trusted decentralized ecosystem.
            </p>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8 w-full max-w-3xl" />
    </div>
  );
};

export default HomePage;
