"use client"; 

import React, { useEffect } from 'react';
import { useTheme } from "next-themes"


export const Pricing = () => {
    
    const { theme } = useTheme()

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://js.stripe.com/v3/pricing-table.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            {theme == "light" && React.createElement("stripe-pricing-table", {
                "pricing-table-id": process.env.NEXT_PUBLIC_LIGHT_STRIPE_PRICING_TABLE_ID,
                "publishable-key": process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
                "customer-email": "sharma.yashdeep@outlook.com",
            })}
            {theme == "dark" && React.createElement("stripe-pricing-table", {
                "pricing-table-id": process.env.NEXT_PUBLIC_DARK_STRIPE_PRICING_TABLE_ID,
                "publishable-key": process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
                "customer-email": "sharma.yashdeep@outlook.com",
            })}
        </div>
    );
};