export const getCurrentUser = /* GraphQL */ `
  query GetCurrentUser {
    getCurrentUser {
      __typename
      id
      name
      tours {
        item {
          tour {
            id
            name
            thumbnail
            coordinates
            url
            cluster {
              id
              name
            }
          }
        }
      }
      meetings {
        item {
          id
          title
          date
          tour {
            url
            id
            name
            thumbnail
          }
        }
      }
    }
  }
`;

export const getUser = /* GraphQL */ `
  query GetUser($username: String!) {
    getUser(username: $username) {
      id
      name
      email
      country
      company {
        name
        external
      }
      enabled
      createdAt
      signedInAt
      tours {
        item {
          tour {
            id
            name
          }
        }
      }
    }
  }
`;

export const getAllUsers = /* GraphQL */ `
  query GetAllUsers(
    $limit: Int
    $nextToken: String
    $names: [String!]
    $emails: [String!]
    $groups: [String!]
    $countries: [String!]
    $companies: [String!]
    $latest: DateRange
    $enabled: Boolean
  ) {
    getAllUsers(
      limit: $limit
      nextToken: $nextToken
      filter: {
        names: $names
        emails: $emails
        groups: $groups
        countries: $countries
        companies: $companies
        latest: $latest
        enabled: $enabled
      }
    ) {
      item {
        id
        name
        email
        country
        company {
          name
          external
        }
        enabled
        createdAt
        signedInAt
      }
      nextToken
    }
  }
`;

export const getAllTours = /* GraphQL */ `
  query GetAllTours {
    getAllTours {
      id
      name
    }
  }
`;

export const getLatestRecord = /* GraphQL */ `
  query GetLatestRecord($from: AWSDate!, $to: AWSDate!) {
    getLatestRecord(range: { from: $from, to: $to }) {
      totalSignIn
      totalTourAccess
      mostTourAccess {
        id
        name
        count
      }
      rankedSignIn {
        name
        count
      }
      rankedTourAccess {
        id
        name
        count
      }
    }
  }
`;

export const getUserReport = /* GraphQL */ `
  query GetUserReport($from: AWSDate!, $to: AWSDate!) {
    getUserReport(range: { from: $from, to: $to }) {
      users {
        loginCount
        username
      }
      total
    }
  }
`;

export const getTourReport = /* GraphQL */ `
  query GetTourReport($from: AWSDate!, $to: AWSDate!) {
    getTourReport(range: { from: $from, to: $to }) {
      tours {
        tourId
        tourName
        visitCount
      }
      total
    }
  }
`;

export const getSingleTourReport = /* GraphQL */ `
  query GetSingleTourReport($from: AWSDate!, $to: AWSDate!, $tourId: ID!) {
    getSingleTourReport(range: { from: $from, to: $to }, tourId: $tourId) {
      tourId
      tourName
      total
      tours {
        accessedDate
        username
      }
    }
  }
`;

export const getActivityLog = /* GraphQL */ `
  query GetActivityLog($limit: Int, $nextToken: AWSJSON) {
    getActivityLog(limit: $limit, nextToken: $nextToken) {
      item {
        recordType
        recordedAt
        userName
        extra
      }
      nextToken
    }
  }
`;
