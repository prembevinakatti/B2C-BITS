import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

const plans = [
  {
    name: "Free Trial",
    price: "Free",
    priceUSD: "Free",
    storage: "50GB",
    uploadRoles: "Only Head",
    monthlyCost: 0,
    features: [
      "Free of cost",
      "50GB storage",
      "Only head can upload documents",
    ],
  },
  {
    name: "Basic Plan",
    price: "₹250/month",
    priceUSD: "$3.00/month",
    storage: "100GB",
    uploadRoles: "Only Head",
    monthlyCost: 250,
    features: [
      "₹250 per month",
      "$3.00 per month",
      "100GB storage",
      "Only head can upload documents",
    ],
  },
  {
    name: "Standard Plan",
    price: "₹450/month",
    priceUSD: "$5.50/month",
    storage: "250GB",
    uploadRoles: "All Roles",
    monthlyCost: 450,
    features: [
      "₹450 per month",
      "$5.50 per month",
      "250GB storage",
      "All roles can upload documents",
    ],
  },
  {
    name: "Pay Per Use",
    price: "₹5/GB",
    priceUSD: "$0.06/GB",
    storage: "Flexible",
    uploadRoles: "All Roles",
    monthlyCost: "5/GB",
    features: [
      "₹5 per GB per month",
      "$0.06 per GB per month",
      "Flexible storage",
      "All roles can upload documents",
    ],
  },
];

const PlanCard = ({ plan }) => {
  return (
    <Card className="mb-8 hover:shadow-lg transition border border-secondary rounded-lg p-6 lg:p-8">
      <CardHeader className="bg-secondary p-4 rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-primary flex justify-between items-center">
          {plan.name}
          <span className="font-semibold text-accent text-lg">{plan.price} / {plan.priceUSD}</span>
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground mt-2">
          {plan.storage} storage | {plan.uploadRoles} upload access
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center text-muted-foreground">
              <FaCheckCircle className="text-primary mr-3 text-lg" /> {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const PricingPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-4xl font-bold text-center text-primary mb-12">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan, index) => (
          <PlanCard key={index} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
