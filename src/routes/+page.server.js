import { extract } from '@extractus/feed-extractor'

export const actions = {
    fetchFeedInfo: async ({request}) => {
        const form = await request.formData();
        const feedURL = form.get('feed-url');

        let feed = await extract(feedURL);

        let title = feed.title.trim();
        let xmlUrl = feedURL;
        let htmlUrl = feed.link.trim()

        return { title, xmlUrl, htmlUrl };
    }
};