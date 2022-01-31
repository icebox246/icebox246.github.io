#!/usr/bin/env node

const postTemplate = ` # Hello World

hello
`

const {readFileSync, writeFileSync, existsSync} = require('fs');
const {argv, exit} = require('process');

if (argv.length < 3) {
    console.log('Usage: new_post.js <new_post_name> [<date: YYYY_MM_DD>]');
    console.log('       new_post.js update');
    exit(1);
}

const posts = JSON.parse(readFileSync('posts.json').toString());

if (argv[2] == 'update') {
    for (let post of Object.keys(posts)) {
        if (!existsSync(`posts/${post}.md`)) {
            console.log('Removing entry for:', post);
            delete posts[post];
        }
    }

    writeFileSync('posts.json', JSON.stringify(posts));

    exit(0);
}

const new_post_name = argv[2];
const new_post_date = (() => {
    if (argv.length > 3) {
        return argv[3];
    } else {
        const date = new Date();

        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();

        return (year + '_' + month + '_' + day);
    }
})();

const new_post_slug = new_post_date + '_' + new_post_name;


if (posts[new_post_slug] == undefined) {
    posts[new_post_slug] = {
        date: new_post_date,
        summary: '<++>',
        slug: new_post_slug
    };

    writeFileSync('posts.json', JSON.stringify(posts));
    if (!existsSync(`posts/${new_post_slug}.md`)) {
        writeFileSync(`posts/${new_post_slug}.md`, postTemplate);
    }

    console.log(`Created new post ${new_post_slug}!`);
} else {
    console.log(`Post with slug ${new_post_slug} already exists!`);
    exit(1);
}
