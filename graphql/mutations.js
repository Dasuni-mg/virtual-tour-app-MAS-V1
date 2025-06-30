export const createMeeting = /* GraphQL */ `
  mutation CreateMeeting(
    $date: AWSDateTime!
    $title: String!
    $tourId: ID!
    $participants: [String!]
  ) {
    createMeeting(
      date: $date
      title: $title
      tourId: $tourId
      participants: $participants
    ) {
      id
      title
      date
      tour {
        id
        name
        thumbnail
        url
      }
    }
  }
`;

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $allocatedTours: [ID!]!
    $email: String!
    $name: String!
    $username: String!
    $typename: String!
    $country: String!
    $company: String!
    $external: Boolean!
  ) {
    createUser(
      allocatedTours: $allocatedTours
      email: $email
      name: $name
      username: $username
      typename: $typename
      country: $country
      company: $company
      external: $external
    )
  }
`;

export const editUser = /* GraphQL */ `
  mutation EditUser(
    $allocatedTours: [ID!]!
    $email: String!
    $name: String!
    $id: String!
    $country: String!
    $company: String!
    $external: Boolean!
  ) {
    editUser(
      allocatedTours: $allocatedTours
      email: $email
      name: $name
      id: $id
      country: $country
      company: $company
      external: $external
    )
  }
`;

export const toggleUser = /* GraphQL */ `
  mutation ToggleUser($id: String!, $enable: Boolean!) {
    toggleUser(id: $id, enable: $enable)
  }
`;

export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id)
  }
`;

export const sendSupportMessage = /* GraphQL */ `
  mutation SendSupportMessage(
    $email: String!
    $subject: String!
    $message: String!
  ) {
    sendSupportMessage(email: $email, subject: $subject, message: $message)
  }
`;
