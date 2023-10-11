import { pool } from "../db";

const queryGetUserWithCurrentUserId = `
SELECT tweet.*, COUNT(like.id) AS like_count,
    EXISTS (
        SELECT 1
        FROM like
        WHERE like.tweet_id = tweet.id
        AND like.user_id = $1
    ) AS user_has_liked
FROM tweet
LEFT JOIN like ON tweet.id = like.tweet_id
GROUP BY tweet.id
ORDER BY tweet.created_at DESC
`;

const queryGetUserWithOutCurrentUserId = `
SELECT tweet.*, COUNT(like.id) AS like_count,
FROM tweet
LEFT JOIN like ON tweet.id = like.tweet_id
GROUP BY tweet.id
ORDER BY tweet.created_at DESC
`;

export async function getTweets(currentUserID?: string) {
    let query = queryGetUserWithCurrentUserId;

    if(!currentUserID) query = queryGetUserWithOutCurrentUserId;
    
    console.log("IT'S RUNNING!!");

    pool.query(query, [currentUserID], (error, result) => {
        if(error) {
            console.log(error);
            return error;
        }

        console.log("IT WORKSSSSSS");

        console.log(result.rows);
    });

    pool.end();
}