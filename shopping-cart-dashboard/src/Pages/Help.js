import React, { useEffect, useState } from "react";

const Help = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Complex Fetch Logic
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Step 1: Users fetch
        const resUsers = await fetch("https://jsonplaceholder.typicode.com/users");
        console.log("Response Data: ",resUsers)
        const usersData = await resUsers.json();
        console.log("usersData Data: ",usersData)

        
        // Step 2: Har user ke posts fetch karo
        const usersWithPosts = await Promise.all(
          usersData.map(async (user) => {
            const resPosts = await fetch(
              `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
            );
            const posts = await resPosts.json();
            console.log("posts Data: ",posts)

            

            return { ...user, posts };
          })
        );

        setUsers(usersWithPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <h2>Loading data...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Users with Posts (Complex Fetch Example)</h1>
      {users.map((user) => (
        <div key={user.id} style={{ marginBottom: "30px" }}>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <h3>Posts:</h3>
          <ul>
            {user.posts.slice(0, 3).map((post) => (
              <li key={post.id}>
                <strong>{post.title}</strong>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Help;
