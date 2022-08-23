import React from "react";

export type Dispatchable<T> = [T, React.Dispatch<React.SetStateAction<T>>];
