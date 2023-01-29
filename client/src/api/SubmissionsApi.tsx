import axios from "axios";

const SUBMISSIONS_LIST_URL = "http://localhost:8000/api/submissions";

export interface SubmissionData {
  id: string;
  companyName: string;
  physicalAddress: string;
  status: string;
  annualRevenue: number;
  application: boolean | string;
  [key: string]: any;
}

export interface CreateSubmissionForm {
  companyName: string;
  physicalAddress: string;
  annualRevenue: number;
}

export interface BindSubmissionData {
  id: string;
  companyName: string;
  address: string;
  annualRevenues: string;
  [key: string]: any;
}

export const listSubmissionData = async () => {
  const response = await axios
    .get<SubmissionData[]>(SUBMISSIONS_LIST_URL)
    .then((res) => res.data);
  return response;
};

export const createSubmission = async (data: CreateSubmissionForm) => {
  const response = await axios
    .post(SUBMISSIONS_LIST_URL, data)
    .then((res) => res.data);
  return response;
};

export const getSubmission = async (id: string) => {
  const response = await axios
    .get<SubmissionData>(`${SUBMISSIONS_LIST_URL}/${id}`)
    .then((res) => res.data);
  return response;
};

export const uploadFile = async (submission: SubmissionData, file: File) => {
  submission.application = file.stream();
  const response = await axios
    .post(`${SUBMISSIONS_LIST_URL}/${submission.id}/upload`, submission)
    .then((res) => res.data);
  return response;
};
