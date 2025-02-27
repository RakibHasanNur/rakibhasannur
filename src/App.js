import axios from "axios";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import AvatarCard from "./components/AvatarCard";
import ErrorPage from "./components/ErrorPage";
import ThemeChanger from "./components/ThemeChanger";
import config from "./config";
import moment from 'moment';
import Details from "./components/Details";
import Skill from "./components/Skill";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Project from "./components/Project";
import Blog from "./components/Blog";
import MetaTags from "./components/MetaTags";
import { LoadingContext } from "./contexts/LoadingContext";
import { ThemeContext } from "./contexts/ThemeContext";

function App() {
    const [theme] = useContext(ThemeContext);
    const [, setLoading] = useContext(LoadingContext);
    const [profile, setProfile] = useState(null);
    const [repo, setRepo] = useState(null);
    const [error, setError] = useState(null);
    const [rateLimit, setRateLimit] = useState(null);

    useEffect(() => {
        if (theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }, [theme])

    const loadData = useCallback(() => {
        axios.get(`https://api.github.com/users/${config.github.username}`)
        .then(response => {
            let data = response.data;

            let profileData = {
                avatar: data.avatar_url,
                name: data.name ? data.name : '',
                bio: data.bio ? data.bio : '',
                location: data.location ? data.location : '',
                company: data.company ? data.company : ''
            }

            setProfile(profileData);
        })
        .then(() => {
            let excludeRepo = ``;

            config.github.exclude.projects.forEach(project => {
                excludeRepo += `+-repo:${config.github.username}/${project}`;
            });

            let query = `user:${config.github.username}+fork:${!config.github.exclude.forks}${excludeRepo}`;

            let url = `https://api.github.com/search/repositories?q=${query}&sort=${config.github.sortBy}&per_page=${config.github.limit}&type=Repositories`;

            axios.get(url, {
                headers: {
                    'Content-Type': 'application/vnd.github.v3+json'
                }
            })
            .then(response => {
                let data = response.data;

                setRepo(data.items);
            })
            .catch((error) => {
                handleError(error);
            });
        })
        .catch((error) => {
            handleError(error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [setLoading])

    useEffect(() => {
        loadData();
    }, [loadData])

    const handleError = (error) => {
        console.error('Error:', error);
        try {
            setRateLimit({
                remaining: error.response.headers['x-ratelimit-remaining'],
                reset: moment(new Date(error.response.headers['x-ratelimit-reset'] * 1000)).fromNow(),
            });

            if (error.response.status === 403) {
                setError(429);
            } else if (error.response.status === 404) {
                setError(404);
            } else {
                setError(500);
            }
        } catch (error2) {
            setError(500);
        }
    }

    return (
        <Fragment>
            <MetaTags profile={profile}/>
            <div className="fade-in h-screen">

                {
                    error ? (
                        <ErrorPage
                            status={`${error}`}
                            title={(error === 404) ? 'The Github Username is Incorrect' : (
                                error === 429 ? 'Too Many Requests.' : `Ops!!`
                            )}
                            subTitle={
                                (error === 404) ? (
                                    <p>
                                        Please provide correct github username in <code>src\config.js</code>
                                    </p>
                                ) : (
                                    error === 429 ? (
                                        <p>
                                            Oh no, you hit the{' '}
                                            <a
                                                href="https://developer.github.com/v3/rate_limit/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                rate limit
                                            </a>
                                            ! Try again later{rateLimit && ` ${rateLimit.reset}`}.
                                        </p>
                                    ) : `Something went wrong`
                                )
                            }
                        />
                    ) : (
                        <Fragment>
                            <div className="p-4 lg:p-10 min-h-full bg-base-200">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-box">
                                    <div className="col-span-1">
                                        <div className="grid grid-cols-1 gap-6">
                                            {
                                                !config.themeConfig.disableSwitch && (
                                                    <ThemeChanger/>
                                                )
                                            }
                                            <AvatarCard profile={profile}/>
                                            <Details profile={profile}/>
                                            <Skill/>
                                            <Experience/>
                                            <Education/>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-2 col-span-1">
                                        <div className="grid grid-cols-1 gap-6">
                                            <Project repo={repo}/>
                                            <Blog/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* DO NOT REMOVE/MODIFY THE FOOTER */}
                            <footer className="p-4 footer bg-base-200 text-base-content footer-center">
                                <div>
                                    <p className="font-mono text-sm">Made with <a className="text-primary" href="https://github.com/arifszn/ezprofile" target="_blank" rel="noreferrer">ezProfile</a> and ❤️</p>
                                </div>
                            </footer>
                        </Fragment>
                    )
                }
            </div>
        </Fragment>
    );
}

export default App;
