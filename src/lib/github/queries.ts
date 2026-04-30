export const USER_PROFILE_QUERY = `
  query UserProfile {
    viewer {
      login
      name
      avatarUrl
      bio
      company
      location
      createdAt
      followers { totalCount }
      following { totalCount }
      starredRepositories { totalCount }
      pullRequests(states: [OPEN, CLOSED, MERGED]) { totalCount }
      repositories(first: 100, ownerAffiliations: [OWNER, COLLABORATOR], orderBy: { field: PUSHED_AT, direction: DESC }) {
        totalCount
        nodes {
          name
          nameWithOwner
          url
          stargazerCount
          isPrivate
          isFork
          primaryLanguage {
            name
            color
          }
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history {
                  totalCount
                }
              }
            }
          }
        }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
              color
            }
          }
        }
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalRepositoryContributions
        restrictedContributionsCount
      }
    }
  }
`;

export const PUBLIC_USER_PROFILE_QUERY = `
  query PublicUserProfile($login: String!) {
    user(login: $login) {
      login
      name
      avatarUrl
      bio
      company
      location
      createdAt
      followers { totalCount }
      following { totalCount }
      starredRepositories { totalCount }
      pullRequests(states: [OPEN, CLOSED, MERGED]) { totalCount }
      repositories(first: 100, ownerAffiliations: [OWNER], orderBy: { field: PUSHED_AT, direction: DESC }, privacy: PUBLIC) {
        totalCount
        nodes {
          name
          nameWithOwner
          url
          stargazerCount
          isPrivate
          isFork
          primaryLanguage {
            name
            color
          }
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history {
                  totalCount
                }
              }
            }
          }
        }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
              color
            }
          }
        }
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalRepositoryContributions
        restrictedContributionsCount
      }
    }
  }
`;
