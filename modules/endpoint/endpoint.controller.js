"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyWebhook = verifyWebhook;
exports.handleWebhookData = handleWebhookData;
const VERIFY_TOKEN = "your_verify_token"; // Set this in App Dashboard
const APP_SECRET = "07edcf372dc928b170fc3f1a15d70c5b"; // Found in Meta Developer Console
// const APP_SECRET = "60e1159df179ff58ea6d1ca4596a0723"; // Found in Meta Developer Console
const PAGE_ACCESS_TOKEN = "EAAFzFylf8lMBOyzypGsnMVQTJbahntZAp1qVXPMvyqIMGFfjbVyIVpS8zZBqOZCmd9Cceqbsec49oudMarvg6QsLKAOtpAR6xm9oZA3E36Ni1FwMsI80nv30ghGMHPZCwlVlD2w1DqwHVnp02kY85SSPJi1oBHcar2ICUwBhZBX7O1TJyZCFGmiOFZCincPhkt2blhDSe3Kc46iLeMww0RGCHusVfqiUBl2YyCZCbs3kI"; // Page Access Token from Meta Developer Console
// Webhook Verification
function verifyWebhook(req, res) {
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("WEBHOOK_VERIFIED");
        res.status(200).send(challenge);
    }
    else {
        res.sendStatus(403);
    }
}
// // Handle Webhook Data (Page Events)
function handleWebhookData(req, res) {
    let body = req.body;
    console.log(req.body);
    if (body.object === "page") {
        body.entry.forEach((entry) => {
            // let webhookEvent = entry.changes[0];
            console.log("Webhook event:", entry);
        });
        res.status(200).send("EVENT_RECEIVED");
    }
    else {
        res.sendStatus(404);
    }
    // const signature = req.headers["x-hub-signature-256"] as string;
    // if (!verifySignature(req.body, signature)) {
    //     console.error("Invalid signature, request rejected.");
    //     // return res.sendStatus(403);
    // }
    // console.log("Webhook received:", JSON.stringify(req.body, null, 2));
    // // Process Webhook Event
    // if (req.body.object === "page") {
    //     req.body.entry.forEach((entry: any) => {
    //         entry.changes.forEach((change: any) => {
    //             if (change.field === "feed") {
    //                 console.log(change.value, "||||||||||||||||||||||||||||||||||||||||||| +++++++++++++++++++")
    //                 // handlePageFeedEvent(change.value);
    //             }
    //         });
    //     });
    // }
    res.sendStatus(200);
}
// // Handle Page Feed Events (Posts, Comments, Likes)
// async function handlePageFeedEvent(event: any) {
//     console.log("Page Feed Event:", event);
//     const { item, post_id, message, from } = event;
//     if (item === "post") {
//         console.log(`New post by ${from.name}: ${message}`);
//         // Auto-comment on new posts
//         await commentOnPost(post_id, "Thank you for posting!");
//     }
// }
// // Comment on a Facebook Page Post
// async function commentOnPost(postId: string, message: string) {
//     try {
//         const url = `https://graph.facebook.com/${postId}/comments`;
//         const response = await axios.post(url, {
//             message,
//             access_token: PAGE_ACCESS_TOKEN,
//         });
//         console.log("Comment posted:", response.data);
//     } catch (error: any) {
//         console.error("Error posting comment:", error.response?.data || error.message);
//     }
// }
// // Signature verification function
// function verifySignature(payload: any, signature: string | undefined): boolean {
//     if (!signature) return false;
//     const receivedHash = signature.split("=")[1];
//     if (!receivedHash) return false;
//     const expectedHash = crypto
//         .createHmac("sha256", APP_SECRET)
//         .update(JSON.stringify(payload))
//         .digest("hex");
//     return receivedHash === expectedHash;
// }
// // Subscribe App to Page Webhooks
// export async function subscribeAppToPage(pageId: string) {
//     try {
//         const url = `https://graph.facebook.com/${pageId}/subscribed_apps?subscribed_fields=feed,messages&access_token=${PAGE_ACCESS_TOKEN}`;
//         const response = await axios.post(url);
//         console.log("Successfully subscribed to page:", response.data);
//     } catch (error: any) {
//         console.error("Error subscribing to page:", error.response?.data || error.message);
//     }
// }
