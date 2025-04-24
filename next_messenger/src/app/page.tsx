"use client";

import React from "react";
import { firebaseAuth, firebaseStore } from "../../firebase-config";
import { useRouter } from "next/navigation";
import Spinner from "../component/Spinner";
import { useAppDispatch } from "../redux/hooks";
import { doc, onSnapshot } from "firebase/firestore";
import { getCurrentUser } from "../controller/FirebaseController";
import { controlMessageToast, setUserInfo } from "../redux/features";
import { UserInfoSnapshot } from "../controller/SnapshotController";

export default function Page() {
  const router = useRouter();
  const currentUser = firebaseAuth.currentUser;
  
  React.useEffect(() => {
      if (currentUser) {
          //getCurUserInfo();
          router.push("/main");
      } else {
          router.push("/login");
      }
  }, []);
  UserInfoSnapshot();

  return (
    <div className="main-div">
      <Spinner size={16} />
    </div>
  );
}
