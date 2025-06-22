// stackbit.config.ts
import {defineStackbitConfig} from '@stackbit/types';
import {GitContentSource} from '@stackbit/cms-git';

export default defineStackbitConfig({
    stackbitVersion: '~0.7.0',
    ssgName: 'nextjs',
    nodeVersion: '20',
    contentSources: [
        new GitContentSource({
            rootPath: __dirname,
            contentDirs: ['data/posts', 'data/authors'],
            models: [
                {
                    name: "Post",
                    type: "page",
                    urlPath: "/posts/{slug}",
                    filePath: "data/posts/{slug}.mdx",
                    fields: [
                        {name: "title", type: "string", required: true, default: 'Post Title'},
                        {name: "description", type: "string", default: 'Post description goes here'},
                        {name: "date", type: "date", required: true},
                        {
                            name: 'author',
                            type: 'reference',
                            label: 'Author',
                            models: ['Author']
                        }
                    ]
                },
                {
                    name: 'Author',
                    type: 'data',
                    filePath: 'data/authors/{slug}.json',
                    label: 'Author',
                    labelField: 'name',
                    fields: [
                        {name: 'slug', type: 'string', required: true},
                        {name: 'name', type: 'string', label: 'Author Name', required: true},
                        {name: 'avatar', type: 'image', label: 'Avatar'},
                    ],
                },
            ],
            assetsConfig: {
                referenceType: 'static',
                staticDir: 'public',
                uploadDir: 'images',
                publicPath: '/'
            }
        })
    ]
});