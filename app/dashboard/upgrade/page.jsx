"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { eq } from "drizzle-orm";

function Upgrade() {
    const { user } = useUser();
    const [userDetail, setUserDetails] = useState();

    useEffect(() => {
        user && GetUserDetail();
    }, [user]);

    const GetUserDetail = async () => {
        const result = await db
            .select()
            .from(USER_TABLE)
            .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

            if (result && result[0]) {
                setUserDetails(result[0]);
                console.log("User membership status:", result[0].isMember);
            }
    };

    console.log(GetUserDetail.isMember);

    const OnCheckoutClick = async () => { 
        const result = await axios.post("/api/payment/checkout", {
            priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
        });
        console.log(result.data);
        window.open(result.data.session.url);
    };

    const onPaymentManage = async () => {
        const result = await axios.post("/api/payment/manage-payment",{
            customerId: userDetail?.customerId,
        });

        console.log(result.data);
        window.open(result.data?.url);
    };

    return (
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
            <div className="text-center mb-8">
                <h2 className="font-medium text-3xl mb-2">Plans</h2>
                <p className="text-gray-600 font-medium">
                    Update your plan to generate unlimited courses for your exam
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center">
                {/* Free Plan */}
                <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <div className="text-center">
                        <h3 className="text-lg font-medium text-gray-900">Free</h3>
                        <p className="mt-4 text-4xl font-bold">
                            ₹0<span className="text-xl font-normal">/month</span>
                        </p>

                        <div className="mt-6 space-y-3">
                            <p className="text-sm">5 Course Generate</p>
                            <p className="text-sm">Limited Support</p>
                            <p className="text-sm">Help center access</p>
                        </div>

                        <div className="mt-8">
                            <Button disabled className="w-full bg-gray-100 text-gray-400">
                                Current Plan
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Monthly Plan */}
                <div className="rounded-2xl border-2 border-blue-500 p-6 shadow-lg">
                    <div className="text-center">
                        <h3 className="text-lg font-medium text-blue-600">Monthly</h3>
                        <p className="mt-4 text-4xl font-bold">
                            ₹999<span className="text-xl font-normal">/month</span>
                        </p>

                        <div className="mt-6 space-y-3">
                            <p className="text-sm">Unlimited Course Generate</p>
                            <p className="text-sm">Unlimited Flashcard, Quiz</p>
                            <p className="text-sm">Email support</p>
                            <p className="text-sm">Help center access</p>
                        </div>

                        <div className="mt-8">
                            {!userDetail?.isMember ? (
                                <Button
                                    onClick={OnCheckoutClick}
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                >
                                    Get Started
                                </Button>
                            ) : (
                                <Button
                                    onClick={onPaymentManage}
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                >
                                    Manage Payment
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Upgrade;
