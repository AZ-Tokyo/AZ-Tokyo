# GitHub Copilot Instructions for AZ-Tokyo

## About This Repository

In this repository, we are developing software that makes company registration easy by using the “Law API Version 2” provided by the Digital Agency of Japan. This software is being developed as part of the “[‘Law’ × ‘Digital’ Hackathon](https://www.digital.go.jp/news/bb600dd7-d3a6-44a1-8138-b7bba052ac9c)” hosted by the Digital Agency.  
In this project, we are developing a web application. Both the backend and the frontend are managed within this single repository.

## About “Law API Version 2”

The specification for “Law API Version 2” is available at: [https://laws.e-gov.go.jp/api/2/swagger-ui/](https://laws.e-gov.go.jp/api/2/swagger-ui/).  
“Law API Version 2” is an API that allows you to search and retrieve laws registered on the e-Gov law search website via API.

## Programming Languages and Frameworks

The planned stack for this project is as follows.

### Backend

- Language: Go
- Web framework: Gin
- Test framework: Go test and Testify

### Frontend

- Language: TypeScript
- Web framework: React
- Test framework: vitest

## Review Rules

When a pull request is opened, we would like you (GitHub Copilot) to perform a review. When doing so, you must strictly follow the rules below.

### Language of Review Comments

Regardless of the circumstances, all review comments must always be written in **Japanese**.

### Labels for Review Comments

For each review comment, you must add exactly one of the following labels on the first line:

- ![Static Badge](https://img.shields.io/badge/must-ff3232?style=for-the-badge)  
  - Use this to point out critical bugs or implementation mistakes that **must be fixed** before the pull request can be merged.
- ![Static Badge](https://img.shields.io/badge/ask-ff9600?style=for-the-badge)  
  - Use this to ask questions about the changes that were made.
- ![Static Badge](https://img.shields.io/badge/imo-00afff?style=for-the-badge)  
  - Short for “In my opinion”. Use this to share personal opinions such as “If it were me, I would implement it this way”.
- ![Static Badge](https://img.shields.io/badge/nits-7d64ff?style=for-the-badge)  
  - Short for “nitpicks”. Use this for minor suggestions that do not need to be fixed.
- ![Static Badge](https://img.shields.io/badge/good-32e132?style=for-the-badge)  
  - Use this to comment on parts of the changes that are well implemented.

Use each label correctly according to its intended meaning.

### What to Pay Special Attention to in Reviews

In your review, carefully compare the existing source code and configuration files with the newly changed parts, and review them in detail.  
In particular, pay special attention to the following points:

- Whether there are any serious memory errors such as segmentation faults, bus errors, or memory leaks.
- Whether there is any implementation that may cause security vulnerabilities.
- Whether there are any infinite loops or similar issues that could cause the program to keep running indefinitely.
- Whether errors are handled correctly so that the program does not terminate unexpectedly when an error occurs.
- Whether there are any breaking changes compared to the existing implementation that would cause previously working behavior to stop working correctly.
