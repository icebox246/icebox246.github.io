import {createApp} from 'https://unpkg.com/petite-vue?module'
import {marked} from 'https://unpkg.com/marked?module'

(async () => {
	const posts = await (await fetch("/posts.json")).json();

    createApp({
		posts,
		async fetchPostContent(slug) {
			console.log('Fetching content for slug:', slug);
			const txt = await (await fetch(`/posts/${slug}.md`)).text();
			const mdtxt = await marked(txt);
			console.log("Fetched", txt);
			this.posts[slug].content = mdtxt;
		}
	}).mount();
}) ();

