"use client";

import React from "react";
import { MotionConfig } from "framer-motion";

function RespectMotionPreferences(props) {
  return <MotionConfig reducedMotion={"user"}>{props.children}</MotionConfig>;
}

export default RespectMotionPreferences;
