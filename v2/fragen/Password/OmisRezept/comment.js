// Dynamic load SupaBase (Who likes firebase...) 🖕
(async () => {
    const {createClient} = await import(
        "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm"
        );

    const supabaseURL = "https://tbmfotattmimxlftfgdj.supabase.co";
    const supabaseAnonKey = // Hard coding credentials, is totallly fine for a demo righttttt? 🤔
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibWZvdGF0dG1pbXhsZnRmZ2RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc1MTc0NDksImV4cCI6MjA0MzA5MzQ0OX0.ZrNL7Jr_lgyjJErLluVjwRfEj7zt76IAwcFf5MG-pBw";
    const supabase = createClient(supabaseURL, supabaseAnonKey); // Yeaaaa no RLS but damm this aint production 🤷‍♂️

    async function fetchPosts() {
        // fetches the posts from the database
        const {data: posts, error} = await supabase
            .from("posts")
            .select("*")
            .order("created_at", {ascending: false});

        if (error) {
            console.error("Error while getting the posts, cuz of:", error);
            return;
        }

        const commentsThread = document.querySelector(".comments-thread");
        commentsThread.innerHTML = "";

        posts.forEach((post) => {
            // create the post elements and append them to the comments thread
            const postDiv = document.createElement("div");
            postDiv.className = "post";
            postDiv.innerHTML = `<h3>${post.username}:</h3><p>${post.content}</p>`;
            commentsThread.appendChild(postDiv);
        });
    }

    async function addPost() {
        const username = document.querySelector(".username-input").value.trim();
        const content = document.querySelector(".comments-input").value.trim();

        if (!username) {
            alert("Du bist namenslos? Oh nein!!!");
            return;
        }

        if (!content) {
            alert("Du kannst nix leeres posten kek");
            return;
        }

        const {error} = await supabase
            .from("posts")
            .insert([{username, content, created_at: new Date().toISOString()}]);

        if (error) {
            console.error("Woops. error. Errocode:", error);
            return;
        }

        document.querySelector(".comments-input").value = "";
        document.querySelector(".username-input").value = "";
        await fetchPosts();
    }

    document // add event listeners to the post button so that it posts the comment
        .querySelector(".post-button")
        .addEventListener("click", addPost);

    await fetchPosts();
})();
