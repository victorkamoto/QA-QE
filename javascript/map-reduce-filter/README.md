# map-reduce-filter

## Description

You're building a data analysis dashboard for a social media platform. The API provides an array of user objects, each containing properties like id, name, location, friends (an array of friend IDs), and posts (an array of post objects with content, timestamp, and likes count).

**Challenge:**

Develop a single function using map, reduce, and filter to achieve the following:

- **Filter Active Users:** Identify users who have posted at least once in the past week (based on timestamp).
- **Extract Popular Posts:** From the active users' posts, filter out those with less than 10 likes.
- **Calculate Average Likes per User:** Reduce the remaining popular posts to a single value representing the average number of likes per active user across all their popular posts.

**Constraints:**

- Use only map, reduce, and filter (no explicit loops).
- Handle potential edge cases (e.g., empty arrays, invalid dates).
- Aim for code clarity, efficiency, and readability.

**Bonus:**

Extend the function to return an object containing:

- The number of active users.
- The total number of popular posts.
- The average likes per user.
