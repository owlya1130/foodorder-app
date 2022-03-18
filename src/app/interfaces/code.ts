import { CodeType } from "./code-type";

export interface Code {
  uid: string | null;
  type: CodeType;
  name: string;
}
