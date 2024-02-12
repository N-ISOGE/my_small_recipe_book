---
title: "Astro Cactus 사용하는 블로그에 webmention 기능 활성화하기"
description: "webmentions 기능을 켜는 동안 했던 일을 기록함                   "
publishDate: 2024-02-10
tags: ["webmentions", "astro", "social"]
draft: true
---

refer : [astro-cactus.webmentions](https://astro-cactus.chriswilliams.dev/posts/webmentions/)

## 요약

1. `src/components/SocialList.astro`에 SNS 정보가 작성되어 있는지 확인하기, email 주소가 적혀 있는지 확인하기  
2. [Webmention.io](https://webmention.io/) 계정 만들기.  
3. `src/site.config.ts` 파일에 있는 `siteConfig.webmentions`에 피드를 보기위한 링크 추가하기
    - 마지막에 `/webmention`이 달려있는 링크 추가하기
4. `.env` 파일을 만들거나 동봉된 `.example.env`를 이름을 `.env`로 바꾸고, `WEBMENTION_API_KEY` 키를 추가하고 API 키값을 값으로 넣기
    - 아니면 빌드할 때, 환경변수를 추가하기
5. Go to [brid.gy](https://brid.gy/)에서 연결하기를 원하는 SNS 계정을 통하여 회원가입 및 로그인하기
6. 웹사이트를 빌드하고 배포하기

## 한 일들
- 1, 2, 3까지 하다가 4에서 블로그 배포할 때 설정한 환경변수 부분을 다시 건들임.
- 설정은 했는데 활용하는 방법이 있나?

## webmentions이란?

웹사이트에서 페이지와 관련된 좋아요, 댓글, 공유 등 SNS 활동을 보여주는 방법입니다.  
이 테마는 블로그 게시글에 대해 좋아요 수나 언급, 댓글을 표시합니다.  
webmention 기능 중 몇몇이 빠졌지만, 이걸 추가하는 것이 어렵지 않을 것입니다.  
- 블로그를 언급한 글에 좋아요를 주는 기능

## Steps to add it to your own site

Your going to have to create a couple of accounts to get things up-and-running. But, the first thing you need to ensure is that your social links are correct.


- Head over to `src/components/SocialList.astro` and enter your details into the `socialLinks` array. By default, the most important is your email address as this has the `isWebmention` property. This just adds the `rel="me authn"` value to the social link. You don't have to include an email, you can just delete it and any others, just make sure that at least one social link has the `isWebmention` property, or set the `rel` property yourself. See [IndieLogin.com](https://indielogin.com/setup) for more information on how to authenticate your domain via links.

- Next up, head over to [Webmention.io](https://webmention.io/) and setup an account by Signing in with your domain name, e.g. `https://astro-cactus.chriswilliams.dev/`. Please note that .app TLD's don't function correctly. Once in, it will give you a couple of links for your domain to accept webmentions. Make a note of these and head over to `src/site.config.ts` and add them to `siteConfig.webmentions`.

Quick note: You don't have to include the pingback link. Maybe coincidentally, but after adding it I started to receive a higher frequency of spam in my mailbox, informing me that my website could be better. Tbh they're not wrong. I've now removed it, but it's up to you.

- Next is to add your api key, also from [Webmention.io](https://webmention.io/), to a `.env` file. Rename the `.example.env`, or create your own, with `WEBMENTION_API_KEY=` and then your personal key. Please try not to publish this to a repository.

- You're now going to have to sign-up to [brid.gy](https://brid.gy/). As the name suggests, it links your website to your social media accounts (you need to add your website to these social accounts if you don't already), so sign-up/connect each account you intend brid.gy to search. Just a thing to note again, brid.gy currently has an issue with .app TLD domains.

With everything set, it's now time to build and publish your website. _REMEMBER_ to set the `WEBMENTION_API_KEY` key with your host, I also forgot this part.

## Testing everything works

With everything setup and live, you can check to see if everything is working by sending a test webmention via [webmentions.rocks](https://webmention.rocks/receive/1). Log in with your domain, enter the auth code, and then the url of the page you want to test. For example, to test this page I would add `https://astro-cactus.chriswilliams.dev/posts/webmentions/`. To view it on your website, rebuild or [re]start dev mode locally, and you should see the result at the bottom of your page.

You can also view any test mentions in the browser via the [api](https://github.com/aaronpk/webmention.io#api).

## Things to add, things to consider

- At the moment, fresh webmentions are only fetched on a rebuild or restarting dev mode, which obviously means if you don't update your site very often you wont get a lot of new content. It should be quite trivial to add a cron job to run the `getAndCacheWebmentions()` function in `src/utils/webmentions.ts` and populate your blog with new content. This is probably what I'll add next as a github action.

- I have seen some mentions have duplicates. Unfortunately, they're quite difficult to filter out as they have different id's.

- I'm not a huge fan of the little external link icon for linking to comments/replies. It's not particularly great on mobile due to its size, and will likely change it in the future.

## Acknowledgements

Many thanks to [Kieran McGuire](https://github.com/chrismwilliams/astro-theme-cactus/issues/107#issue-1863931105) for sharing this with me, and the helpful posts. I'd never heard of webmentions before, and now with this update hopefully others will be able to make use of them. Additionally, articles and examples from [kld](https://kld.dev/adding-webmentions/) and [ryanmulligan.dev](https://ryanmulligan.dev/blog/) really helped in getting this set up and integrated, both a great resource if you're looking for more information!
