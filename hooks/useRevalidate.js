import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { requestRevalidate } from "../app/cms-slices/cms-revalidate.slice";

export default function useRevalidate() {
  const path = useSelector((state) => state.cmsRevalidateState.path);
  const revalidating = useSelector((state) => state.cmsRevalidateState.revalidating);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!revalidating && !!path) {
      dispatch(requestRevalidate(path))
        .then(unwrapResult)
        .then((revalidated) => {
          if (revalidated) {
            toast(`Revalidated path: "${path}"`, { type: "success" });
          } else {
            toast("Error on Revalidating", { type: "error" });
          }
        })
        .catch((e) => {
          console.error(e);
          toast("Error on Revalidating", { type: "error" });
        });
    }
  }, [path, revalidating]);
}