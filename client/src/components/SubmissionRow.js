import React from 'react';

export function SubmissionRow(props) {
  const { submission, onClick } = props;

  function handleClick() {
    onClick(submission);
  }

  return (
    <tr onClick={handleClick}>
      <td data-title="Submission ID">{submission.submission_id}</td>
      <td data-title="Company Name">{submission.company_name}</td>
      <td data-title="Physical Address">{submission.physical_address}</td>
      <td data-title="Status">{submission.status}</td>
      <td data-title="Annual Revenue">{submission.annual_revenue}$</td>
    </tr>
  );
}