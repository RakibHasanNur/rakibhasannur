// config.js
module.exports = {
    github: {
        username: 'RakibHasanNur', // Your GitHub org/user name. (Required)
        sortBy: 'stars', // stars | updated
        limit: 8, // How many projects to display.
        exclude: {
            forks: false, // Forked projects will not be displayed if set to true.
            projects: [] // These projects will not be displayed. example: ['my-project1', 'my-project2']
        }
    },
    social: {
        linkedin: '',
        twitter: '',
        facebook: '',
        dribbble: '',
        behance: '',
        medium: '',
        devto: '',
        website: 'https://rakibhasannur.github.io',
        phone: '',
        email: 'rakibhasannur@gmail.com'
    },
    skills: [
        'PHP',
        'JavaScript',
        'Jquery',
        'MySQL',
        'Git',
        'CSS',
        'Bootstrap',
    ],
    experiences: [
        { 
            company: 'WeNexus LLC',
            position: 'Shopify Developer',
            from: 'June 2021',
            to: 'Present'
        },
        { 
            company: 'iGen Software Ltd',
            position: 'Jr. Frontend Developer',
            from: 'Feb 2021',
            to: 'May 2021'
        }
    ],
    education: [
        { 
            institution: 'Ideal Labrotory college',
            degree: 'Higher Secondary Certificate (HSC)',
            from: '2017',
            to: '2019'
        },
        { 
            institution: 'Azizia Islamia High School',
            degree: 'Secondary School Certificate (SSC)',
            from: '2015',
            to: '2016'
        }
    ],
    blog: {
        // Display blog posts from your medium or dev.to account. (Optional)
        source: '', // medium | dev.to
        username: '',
        limit: 2 // How many posts to display. Max is 10.
    },
    googleAnalytics: {
        // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
        id: '' // Please remove this and use your own tag id or keep it empty
    },
    hotjar: {
        id: '', //  Please remove this and use your own id or keep it empty
        snippetVersion : 6
    },
    themeConfig: {
        default: 'light',

        // Hides the switch in the navbar
        // Useful if you want to support a single color mode
        disableSwitch: false,

        // Should we use the prefers-color-scheme media-query,
        // using user system preferences, instead of the hardcoded default
        respectPrefersColorScheme: true,

        // Available themes. To remove any theme, exclude from here.
        themes: [
            'light',
            'dark',
            'cupcake',
            'bumblebee',
            'emerald',
            'corporate',
            'synthwave',
            'retro',
            'cyberpunk',
            'valentine',
            'halloween',
            'garden',
            'forest',
            'aqua',
            'lofi',
            'pastel',
            'fantasy',
            'wireframe',
            'black',
            'luxury',
            'dracula'
        ]
    }
}
