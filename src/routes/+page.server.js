import { extract } from '@extractus/feed-extractor'
import { error } from '@sveltejs/kit';

export const actions = {
    fetchFeedInfo: async ({request}) => {
        const form = await request.formData();
        const feedURL = form.get('feed-url');

        try {
            let feed = await extract(feedURL);

            let title = feed.title.trim() || feedURL;
            let xmlUrl = feedURL;
            let htmlUrl = feed.link.trim() || feedURL;

            return { title, xmlUrl, htmlUrl };
        } catch (err) {
            throw error(500, err.message);
        }
    }
};