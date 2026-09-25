const SITE = {
  name: "Zosia Marciniak",
  formalName: "Zofia Marciniak",
  pronounciation: "Zoh-see-ah",
  title: "PhD student at ETH Zürich",
  tagline: "human–computer interaction · crafting technology",
  bio: `My name is Zofia (formally), or Zosia (pronounced Zoh-see-ah, or 조시아).<br> I am a PhD student in Computer Science at ETH Zürich, advised by <a href="http://aprilwang.me" target="_blank" rel="noopener" class="text-link">Prof. April Wang</a> in the <a href="http://peachlab.inf.ethz.ch" target="_blank" rel="noopener" class="text-link">PEACH Lab</a>. Previously, I worked as an Engineer at Samsung Electronics. I completed my master's degree at <a href="http://make.kaist.ac.kr" target="_blank" rel="noopener" class="text-link">KAIST Make Lab</a> under Prof. Andrea Bianchi, and before that I completed my double major also at KAIST in Industrial Design and Computer Science.`,
  about: `I'm passionate about bringing traditional crafting and modern tech together and helping crafters digitize their processes and share their work without compromising their artisanality. When I'm not researching or engineering, you'll find me <a href="#fun" class="text-link">crocheting</a>, solving sudokus, bouldering, or traveling with my older sister.`,
  avatar: "images/profile-pic_square.jpg",
  cv: "files/cv.pdf",
  contact: {
    intro: "For collaborations, questions, or just to say hello, feel free to reach out to me through email at zofia.marciniak at inf.ethz.ch",
  },
  links: {
     github: { url: "https://github.com/zosiazamoyska", label: "GitHub" },
    linkedin: { url: "https://www.linkedin.com/in/zosia-marciniak-a2a7a9133", label: "LinkedIn" },
    scholar: { url: "https://scholar.google.com/citations?user=nPJl6dIAAAAJ", label: "Google Scholar" },
  },
};

const NEWS = [
  {
    date: "August 2026",
    title: "Started my PhD at ETH Zurich!",
    body: "I am advised by Prof. April Wang in the PEACH Lab, Computer Science.",
  },
  {
    date: "September 2025",
    title: "Presented at UIST 25' in Busan.",
    body: "Presented my first first-author paper and my master's thesis, StitchFlow.",
  },
  {
    date: "September 2025",
    title: "Became an Engineer at Samsung Electronics.",
    body: "Officially started working in Samsung Electronics, VD!",
  },
];

const PUBLICATIONS = [
  {
    id: "stitchflow",
    title: "StitchFlow: Enabling In-Situ Creative Explorations of Crochet Patterns with Stitch Tracking and Process Sharing",
    authors: "Zofia Marciniak, Punn Lertjaturaphat, and Andrea Bianchi",
    venue: "UIST",
    year: 2025,
    url: "https://dl.acm.org/doi/full/10.1145/3746059.3747715",
    image: "images/StitchFlow_sq.png",
    featured: true,
    abstract: "Crochet resists automation, remaining a manual craft of improvisation. StitchFlow lets crocheters stay immersed while automatically documenting patterns, tracking progress, and sharing designs through motion sensing and a graphical interface.",
  },
  {
    id: "thermopixels",
    title: "3D Printing Locally Activated Visual-Displays Embedded in 3D Objects via Electrically Conductive and Thermochromic Materials",
    authors: "Kongpyung Moon, Zofia Marciniak, Ryo Suzuki, and Andrea Bianchi",
    venue: "CHI",
    year: 2024,
    url: "https://dl.acm.org/doi/10.1145/3613904.3642537",
    image: "images/thermopixels.png",
    featured: true,
    abstract: "ThermoPixels enables actively controlled thermochromic displays embedded in arbitrary 3D geometries, with software for designing flat, curved, and matrix displays.",
  },
  {
    id: "textureslicer-2024",
    title: "Decoupling Geometry from Surface Finish by Parameterizing Texture Directly in G-code for FDM Printing",
    authors: "Zofia Marciniak, Kongpyung Moon, and Andrea Bianchi",
    venue: "AODR",
    year: 2024,
    url: "https://aodr.org/_common/do.php?a=full&b=12&bidx=3672&aidx=40683",
    image: "images/textureslicer.png",
    featured: true,
    abstract: "Texture-Slicer applies texture patterns during slicing rather than modeling, keeping the 3D model unchanged while enabling tunable roughness through G-code modifications.",
  },
  {
    id: "textureslicer-2023",
    title: "3D Printing Slicer for Computational Texture Generation",
    authors: "Zofia Marciniak, Kongpyung Moon, and Andrea Bianchi",
    venue: "Korea HCI",
    year: 2023,
    url: "https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11229626",
    image: "images/prints.png",
    featured: false,
    abstract: "A novel workflow for 3D printing varied surface finishes without CAD texture modeling, by computationally generating G-code with embedded texture patterns.",
  },
  {
    id: "guidering",
    title: "Guide Ring: Bidirectional Finger-worn Haptic Actuator for Rich Haptic Feedback",
    authors: "Zofia Marciniak, Seo Young Oh, and Sang Ho Yoon",
    venue: "VRST (Poster)",
    year: 2022,
    url: "https://dl.acm.org/doi/10.1145/3562939.3565626",
    image: "images/guidering.GIF",
    featured: false,
    abstract: "A wearable haptic device using electromagnetic coils and permanent magnets to create guidance effects through magnetic attraction and repulsion.",
  },
  {
    id: "weather",
    title: "Understanding the impact of the Weather on Human Mobility via LTE Access Traces in Seoul Districts",
    authors: "Zofia Marciniak, Sumin Han, and Dongman Lee",
    venue: "Korea HCI",
    year: 2021,
    url: "https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE10530300",
    image: "images/weather_img.png",
    featured: false,
    abstract: "Exploring how weather conditions affect human activity in urban areas through mobile LTE access traces in Seoul.",
  },
];

const PROJECTS = [
  {
    id: "evergrow",
    base: "_portfolio/2207-evergrow/",
    title: "Evergrow: Investment Education Service",
    images:  ["images/evergrow_square.png", "images/evergrow_1.png", "images/evergrow_2.png", "images/evergrow_3.png", "images/evergrow_4.png", "images/evergrow_5.png", "images/evergrow_6.png", "images/evergrow_7.png"],
    tags: ["UX/UI", "Finance", "iF Award"],
    featured: true,
    description: "Evergrow transforms stock investment into an engaging experience by visualizing portfolios as a growing forest, empowering beginners to build financial literacy.",
    team: "Jaeryung Chung, Jamie Ashley Dee, Minseo Bang, Zofia Marciniak, Eunseoo Oh",
    body: `
<iframe width="560" height="315" src="https://www.youtube.com/embed/aZymHF-HguQ?si=iB8D_ru16mFjLM7l" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
<br>

<img src='images/evergrow_1.png'>

# Introduction

Evergrow is a FinTech app that empowers beginners to participate in stock management and investment, fostering self growth in their financial literacy. It achieves this through a unique representation of a user's portfolio as a forest, enhancing understanding of stocks and reducing frustration from direct exposure to price fluctuations. Over time, the trees representing stocks flourish with sustained investments, encouraging thoughtful decisions and a commitment to long-term investments. The app integrates Hazel, a financial fairy advisor, who provides insights on fiscal choices, cultivating a healthier investment atmosphere for newcomers.

# Problem Statement

<b>Investment is difficult to navigate and understand.</b>

From the stock beginners' perspective, we wanted to establish a system where beginners can grow their ability in stock, learn the basic knowledge and skills on trading stock, but without being too stressed out. With Evergrow, we present an easy stock managing app that enables users to go through step-by-step learning guidance, get mental helath care support to manage stress, acquire healthy stock investment habit, and ask their personal assistant whenever they need to get help in the process.

# Research

## Background Research

* <b>The less you research in stock before buying, the less possibility that you will make good decision</b><br>
Expanding your perspective on stock can make your investment decisions better. Therefore, users should look more into new companies and fields when investing in stock.
<i> - Kumar, A., & Lim, S. S. (2008). How Do Decision Frames Influence the Stock Investment Choices of Individual Investors?</i>

* <b>Stock investing without information can lead to unhealthy trading habit</b><br>
A knowledgeable user is able to responsibly invest in stock. Stock investment without reasoning can lead to gambling and possible addiction. "A basic knowledge of investment is very important to avoid irrational investment practices (gambling)."
<i> - Widhar, Reza & Oktaviani, Indri. (2018). Determinants of Individual Investor Behaviour in Stock Investment Decisions</i>

## Survey and Interview

We conducted a survey and a follow-up interview with young investors aged 20 to 32 years old. We found that most participants engage in stock investment on less frequent basis and find it difficult to obtain informations, study related vocabulary. Participants are afraid to do stock, and often feel like their time is wasted.

<img src='images/survey.png'>
<img src='images/interview.png'>

# Persona

Based on the results, we drafted a vision of what a young, beginner invester looks like.
In a context of a busy, everyday life, stock investment is a side task that should not bring too much additional stress into young person's life.

<img src='images/persona.png'>

# Defined Needs and Evergrow's Solution

Problems we want to solve through the service:
* How might we let users learn and acquire basic knowledge on stock market, but in a fun and easy way?
* Why do people feel frustrated when first learning stock, and how can we solve it?
* How can we visualize stock in an appealing way, to keep users' interest in stock?

## Difficulty in Acquiring Information

Users report difficulty in discerning what's important from the flood of information. Yet it is unrealistic for beginners to look at every source before making investment decisions.

Evergrow's 2-stage structure and guided research solves this problem. A 'Learning Stage' where users can establish sufficient understanding about the basics of stock trading is provided before the 'Habitating Stage' where users engage in actual trading activity. In Habitating Stage, suggestions on what information users should look out for helps make active informed decisions.

## Mental Exhaustion

On the survey our team carried out to 28 participants ranging from 20 to 26 years old, 68% reported to have a passive status toward stock investment. A major reason for this disengagement was emotional fatigue from being overly conscious on price fluctuation.

To prevent investors to going to extremes and giving up investing altogether from excessive stress, Evergrow provides mental care. This is done in the 2 tracks of helping users express negative feelings and relieve them, as well as looking back at past decisions and analyzing the mistakes.

## Lack of Sense of Growth/Achievement

Another major reason that users feel discouraged to continue investing is the lack of sense of growth or achievement. Evergrow replaces traditional stock portfolios into visual and emotionally engaging ones using the metaphor of growing a forest. This has the additional benefit of encouraging long-term investment, by reminding the investors their stocks have the potential to continuously grow and flourish.

# Applied Solution

To support the investment habits of users, we came up with a two-stage process for learning stock investment: learning and habitating, where users first learn about stock investment, and later grow their own forest stock. Throughout the process, we encourage long-term engagement and support them mentally with an interactive in-app guide, Hazel.

<img src='images/level.png'>
<img src='images/feature.png'>

# Vision

There are applications on the market that make it easy to get started in investment, but they lack a support system that keeps users engaged long term. Evergrow incorporates a calming visual of a user's stock portfolio as a forest, applying gamification functions to a fintech app. Additionally, the app supports users in long term investment decisions through showing their stock tree's growth over time and including a checklist of topics to check before buying stock. When users face financial loss, Evergrow offers various support to allow users to make their own steps towards financial literacy and growth in stock investment knowledge.

## Evergrow helps to build long term investment perspectives

Under the Sustainable Development Goals, Evergrow provides quality education by focusing on ensuring inclusive and accessible financial education on stocks and investments and promotes continuous learning opportunities for all. With the fairy assistant, Hazel, the app has built in learning topics targeted to the users' interest and specific feedback to help users improve. Evergrow encourages beginners to continue advancing their knowledge and support them even as they face failure to illustrate the importance of failure for growth.

## Give a chance of intense learning for beginner

Inside the app, the user goes through two stages: learning and habituating. In the first stage, the user studies different topics, level by level, before entering the stock trading system. We encourage the user to build their confidence and grow first, then practice their knowledge on real market.

## Promote the mental health of the investors

As stock trading is very stressful for many young people, we recognize their need for support during their investment, especially when it is not going well. At any time the user can ask Hazel, the fairy assistant, for support in recognizing their emotions. We provide the user with a list of activities they can perform to relieve the stress or we help them rationally analyze their stock investment reasoning.

## Breaking the entry barrier to start investment

With such large volumes of information online, communities with various opinions, and high barriers of entry, it is difficult for beginners to get started in investing. Evergrow simplifies the google searches into specific topics to research and guides users to reliable resources and keywords. In the user interface design, the design elements were created with limited text to read easily, rounded shapes to appeal as friendly, and a visually engaging forest to simplify the user's stock portfolio. Additionally, users can easily move forward in their investment journey with the help of Hazel, the fairy assistant, if they ever get stuck.

# UI design

<img src='images/evergrow_2.png'>
<img src='images/evergrow_3.png'>
<img src='images/evergrow_4.png'>
<img src='images/evergrow_5.png'>
<img src='images/evergrow_6.png'>
<img src='images/evergrow_7.png'>

# My Role / Contribution

My responsibility in the project included:
* Performing background research - finding related research papers
* Conducting survey study - organizing questions
* Interview analysis - collecting pain points and needs

# About This Project

This project received [iF Design Award 2024](https://ifdesign.com/en/winner-ranking/project/evergrow-investment-education-service/618273).

This project was conducted as a part of User Experience (UX) class at ID KAIST, thanks to NH Investment & Securities. The project was a result of a team effort from Jaeryung Chung, Jamie Ashley Dee, Minseo Bang, Zofia Marciniak, Eunseo Oh, Hyeongjeong Im, Sunok Lee and Sangsu Lee.
    `,
  },
  {
    id: "dnd",
    base: "_portfolio/2306-dnd/",
    title: "Do Not Disturb",
    images: [
      "images/dnd-square.png",
      "_portfolio/2306-dnd/images/hero_shot.png",
      "_portfolio/2306-dnd/images/persona.png",
      "_portfolio/2306-dnd/images/brainstorm.png",
      "_portfolio/2306-dnd/images/1stUI.png",
      "_portfolio/2306-dnd/images/GoalTracking.png",
      "_portfolio/2306-dnd/images/UsageInsight.png",
      "_portfolio/2306-dnd/images/colors.png",
    ],
    tags: ["UX", "Data Visualization"],
    featured: true,
    description: "An interface that promotes mindful phone usage, guides you to improve your phone habits, and helps you stay motivated through wise data visualization.",
    team: "Zhi Lin Yap, Siripon Sutthiwanna, Zofia Marciniak",
    body: `
<iframe width="560" height="315" src="https://www.youtube.com/embed/6EBIdDTA1Oc?si=JCXmmNQXz2zdAOnt" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
<br>
<img src='images/hero_shot.png'>

# Problem
Our phones provide us with all the connections - to our friends, to social media, entertrainment, and so on. Phones, as computational machines, are also able to collect the data of our usage. Many phones offer insights about the usage of our screen time and options to limit it -- but is it effective?
We want to find a more sustainable way to improve screen time usage, balancing productivity and personal entertrainment.

# Interview
We interviewed 7 university students (5 undergraduates, 1 graduate, 1 exchange student).

## Target Audience
Our audience is university students whose productivity, sleeping health, and daily lives are impacted by phone usage, and wish to reduce it.

## Interview Structure
Our goal is to learn how could we improve sleeping habits, provide less distraction and increase productivity amongst university students. We hope that university students will start caring about screen time data.
Therefore, our questions are divided into following categories:
* <b>Sharing data</b><br>
Sharing data of last month screen time and notification data
* <b>General well-being</b><br>
How are their sleep habits, anxiety, time-schedule? How does their phone contribute to that?
* <b>Phone settings</b><br>
Do they use any settings filtering notifications? Do they limit their app usage?
* <b>Habits</b><br>
How do they use phone in social situations, during their day, during class?
* <b>User Expectations</b><br>
What do they expect? Which data are they interested in?

## Result Summary
* Users do not want to <b>revolutionize</b> their phone usage habits, but engage in <b>small-step activities</b> to improve their life quality like sleep and productivity.
* Users wish to <b>balance</b> the phone usage for both productivity and leisure.
* They want to maintain a <b>distinct boundary</b> between productivity and leisure, and not switch between those two back and forth.

<h1>Needs and Scenarios</h1>
<b>Need 1</b>: Wants to concentrate on currently performed task.<br>
<b>Scenario 1</b>: In class, the target user keeps getting distracted by phone notifications.

<b>Need 2</b>: Wants to make the most of phone's benefits.<br>
<b>Scenario 2</b>: There are some apps, such as the music app, that keep users more focused on their tasks and increase their level of productivity.

<b>Need 3</b>: Wants to keep track of their productivity.<br>
<b>Scenario 3</b>: Users want to know if they are being as productive as they hope to be, and whether their productivity increases or decreases.

<b>Need 4</b>: Wants to compare their phone usage.<br>
<b>Scenario 4</b>: Users feel guilty about their phone usage when they compare it with other people with lower phone usage.

# Persona
Lia is a 23 years old KAIST student in her 3rd year. She loves cats and Candy Crush. She spends lot of time in books, studing biology. She wants to graduate on time with satisfactory grades. Unfortunately, she often finds herself having not enough time and struggling to complete assignments before the deadline. Due to unstable habits, she is often tired in classes.

<img src='images/persona.png'>

# Visualization Design Process
We started with a session of brainstorming and paper prototypes - every member brought their ideas for how can data be shown and options to be allowed.

<img src='images/brainstorm.png'>

Then, we presented our ideas to each other and each of us wrote down on sticky notes what they liked and would like to include in final interface. We compare features we liked and combined them into five different visualization functions. Finally, we drew the first draft of the visualization.

<img src='images/1stUI.png'>

# Visualization and Interaction Design
For each of tasks we want to support, we designed the data and visual manipulations necessary to achieve the goals. This was derived from a collaborative process of filtering each other's ideas in previous brainstorming session.

## Encourage purposeful self-improvement
<b>Data Manipulation</b><br>
* Filter data by week or month and app categories.
* Allow user to input their goal of reducing their phone usage by specifying the amount they want to reduce it by and the time frame within which they want to achieve this reduction.
* Compare actual app usage and their goal.
* Show projection towards goal.

<b>Visual Manipulation</b><br>
* Color gradient that indicates the degree to which a user's actual phone usage matches their goal.
* Select granularity and applications for which they wish to view data.

## Guide ways to improve phone habits
<b>Data Manipulation</b><br>
* User inputs their schedule.
* User can filter data by app categories.
* Find an app usage event that can be improved by comparing to users' schedule, location and goals.

<b>Visual Manipulation</b><br>
* Scroll horizontally to view all time intervals.
* Zoom in to view the data for the time interval user is interested in.
* Select the applications for which they wish to view data.
* Click and reveal advice to learn more.

## Promote mindful phone usage
<b>Data Manipulation</b><br>
* Filter data by app categories.
* Allow user estimate their own usage.
* Show difference between users' estimation and real usage.

<b>Visual Manipulation</b><br>
* Scroll horizontally to view all time intervals.
* Zoom in to view data in more details.

## Motivate consistent improvement
<b>Data Manipulation</b><br>
* Filter data by week or month.
* Compare data either by week or month.
* Calculate progress and projection towards goal.

<b>Visual Manipulation</b><br>
* Select granularity.
* Visual elements to encourage/warn users.

# Lo-Fi Prototype
We designed a Lo-Fi prototype of the 'Do Not Disturb' app based on our sketches.
We divided the visualizations into two tabs:

## Goal Tracking
<img src='images/GoalTracking.png'>

## Usage Insight
<img src='images/UsageInsight.png'>

## Design
<img src='images/colors.png'>

# Development
The code for this project can be accessed on [Github](https://github.com/ZosiaZamoyska/DoNotDisturb/tree/main)

## Data Processing
Using a given dataset containing App Usage events collected from real users, we process raw entries and extract usage time for each app and category.

## Web Prototype
We built a web prototype using Dash that reflects the same features as Lo-Fi prototype.

# My Role / Contribution
All teammates in this project worked parallely together, but my contribution was the strongest in these areas:
* Background Research - interview question preparation
* Interview Analysis - extracting problems and user needs
* Design - was responsible for 'Week-In-Review' feature
* Data Processing - calculating emotions and sleeping time
* Hero Image - first image on this page, including logo design

# Teammates
* Zhi Lin Yap
* Siripon (Ted) Sutthiwanna
    `,
  },
  {
    id: "on-blog",
    base: "_portfolio/2306-on_blog/",
    title: "온 blog: Fulfilling creator's experience",
    images: [
      "images/on_blog_square.png",
      "_portfolio/2306-on_blog/images/on_blog_1.png",
      "_portfolio/2306-on_blog/images/research.png",
      "_portfolio/2306-on_blog/images/genz.png",
      "_portfolio/2306-on_blog/images/platform_research.png",
      "_portfolio/2306-on_blog/images/secondary_result.png",
      "_portfolio/2306-on_blog/images/persona.png",
      "_portfolio/2306-on_blog/images/journey1.png",
      "_portfolio/2306-on_blog/images/journey2.png",
      "_portfolio/2306-on_blog/images/journey3.png",
      "_portfolio/2306-on_blog/images/journey4.png",
      "_portfolio/2306-on_blog/images/problems.png",
      "_portfolio/2306-on_blog/images/vip1.png",
      "_portfolio/2306-on_blog/images/vip2.png",
      "_portfolio/2306-on_blog/images/vip3.png",
      "_portfolio/2306-on_blog/images/on_blog_2.png",
    ],
    tags: ["UX Design", "System Design"],
    featured: true,
    description: "Empowering Naver creators with a platform that strengthens their identity, fosters connections, and transforms their creative journey into a source of pride.",
    team: "Jian Jun, Jeongjae Lee, Hyerim Hwang, Zofia Marciniak, Adil Hassan Khan",
    body: `
<img src='images/on_blog_1.png'>

# Introduction

Current creators on Naver platform have a lack of sense of accomplishment. With our solution, we want to strengthen the creators identity, create a platform for building relationships with other creators, and allow creators to show their indentity in the process.

온(on) blog is a new type of blogging system supporting a creator to find and strengthen one's own identity as a creator through active cooperation with other creators.
The "온" in 온 blog means: 온: 모든, ON: 위, 溫(온): 따뜻한 (english: everything, up, warm).

# Primary Research
<img src='images/research.png'>

## Talking with Creators
We conducted an in-depth interview with Naver Content Creators. We wanted to explore the commonalities and differences experienced by creators across various categories and the spectrum between newbies and professionals.
* <b>Professional Naver blogger</b><br>
Active content creator using both Naver blog and Instagram for food reviews
* <b>Daily newbie blogger</b><br>
Active, not professional content creator using Naver blog for sharing their daily life
* <b>Webtoon creator</b><br>
Professional webtoon creator

# Secondary Research

We took a closer look at <b>content creation</b> that happens on Naver platforms, and what drives or stops <b>GenZ</b> from doing it. From here, we were able to notice pain points related to old-fashioned style of Naver content creation, competition from other platforms used by young generation. From here, we took a next step in our research: understanding each content creation platform of Naver one-by-one, and interviewing content creators using different Naver platforms.

## Studying the Creators

We looked for GenZ content creator's characteristics, motivation for using different social media platforms and currently offered tools from Naver. We wanted to answer following questions:
* <b>Why does GenZ makes content?</b><br>
What drives GenZ for content creation? What motivates them?
* <b>Why do they use social media?</b><br>
TikTok, Youtube, Instagram - what is the difference between those for GenZ? What advantages do they see?
* <b>What tools does Naver offer for Content Creators?</b><br>
What tools are there on Naver to create better content? What are the pros and cons? What are common points between them? How does Naver stand out?

<img src='images/genz.png'>

## Services for creators in Naver

Naver offers wide scope of different platforms, from text-based blogging, video-driven Naver TV, or webtoons. We study the support each platform gives to the creators, and what tools it provides.

<img src='images/platform_research.png'>

## Result

Based on the primary and secondary research, we were able to organize the characteristics of Gen Z creators, reasons for creating content and most commonly used platforms.

<img src='images/secondary_result.png'>

# Persona and Journey Map
The research helped us narrow a persona of a <b>Gen Z Creator</b>. The interviews helped us create a step-by-step journey of what is like to become a Naver creator, from novice stage to THE influencer.

<img src='images/persona.png'>
<img src='images/journey1.png'>
<img src='images/journey2.png'>
<img src='images/journey3.png'>
<img src='images/journey4.png'>

# Common Features Found in Creator Journey

To narrow down the problem, we looked at common features between different steps of journey to become influencers. Based on that, we came out with eight main problems.

<img src='images/problems.png'>

# VIP model
<img src='images/vip1.png'>
<img src='images/vip2.png'>
<img src='images/vip3.png'>

# Solution Direction
We finally settled on the best solution for the creators: <b>Giving a Sense of Accomplishment</b>.

The question is, when does a creator feel a sense of accomplishement? Within our previously done research, we found two answers:
* By communicating with others
* By seeing how they affect others

Therefore, we started building a tool that facilitates those interactions: a <b>collaborative</b> networking system for bloggers.

# Final Solution
<img src='images/on_blog_2.png'>

The 온 blog proposes a new system structure to enhance sense of accomplishment in the process of collaboration. The first system, 열린 포스트 (an open post), allows the owner of the post to invite all other creators to fill-in the content their posts need in a form of a "call to collaborate". The other system, 열린 글모임 (an open writing meeting), is for established collaborators, who need a system to facilitate smoother collaborations in the editing environment of Naver blog.

# About This Project

This project was conducted as a part of System Design course at ID KAIST, thanks to Naver. The project was a result of a team effort from Jian Jun, Jeongjae Lee, Hyerim Hwang, Zofia Marciniak, Adil Hassan Khan.
    `,
  },
  {
    id: "wheel",
    base: "_portfolio/2312-wheel/",
    title: "Storytelling Wheel",
    images: [
      "images/wheel.gif",
      "_portfolio/2312-wheel/wheel1.png",
      "_portfolio/2312-wheel/wheel2.png",
      "_portfolio/2312-wheel/wheel2.gif",
      "_portfolio/2312-wheel/wheel3.gif",
    ],
    tags: ["Media", "Interaction"],
    featured: true,
    description: "A phenakistiscope animation that reveals a hidden story with a UV flashlight, exploring layered narratives on three different levels.",
    team: "Solo project",
    body: `
<img src='wheel.gif'>

A concept of a phenakistiscope animation that reveals a hidden story with a UV flashlight.

<img src='wheel1.png'>

The animation can be explored in layers and followed as a story. An observer can follow a ball painted with an invisible (in normal light) paint, and follow it's story on 3 different levels.

<img src='wheel2.png'>

Animation was digitally drawn (ProCreate) and refined in Illustrator. Then, a physical prototype was build to display the animation. The image was printed using silkscreen, and attached to a turntable.

<img src='wheel2.gif'>
<img src='wheel3.gif'>
    `,
  },
  {
    id: "blocks",
    base: "_portfolio/z2208-blocks/",
    title: "Ear for blocks",
    images: [
      "images/blocks_square.png",
      "_portfolio/z2208-blocks/images/blocks_1.png",
      "_portfolio/z2208-blocks/images/blocks_2.png",
      "_portfolio/z2208-blocks/images/blocks_3.png",
      "_portfolio/z2208-blocks/images/blocks_4.png",
    ],
    tags: ["Interactive", "Design"],
    featured: true,
    description: "An interactive toy that enables children to explore musical hearing — each block signifies a unique chord scanned and played by the device.",
    team: "Solo project",
    body: `
<img src='images/blocks_1.png'>

Musical education for children is frequently hindered by financial constraints and a lack of resources.

This device enables children to explore and learn musical hearing. Each block signifies a unique chord, and when placed on the toy, the device scans the chords, plays the corresponding music, and exhibits an animation reflecting the mood of the melody.

<img src='images/blocks_2.png'>
<img src='images/blocks_3.png'>
<img src='images/blocks_4.png'>
    `,
  },
  {
    id: "alfresco",
    base: "_portfolio/z2406-alfresco/",
    title: "Al Fresco",
    images: [
      "images/alfresco-square.png",
      "_portfolio/z2406-alfresco/images/board1.png",
      "_portfolio/z2406-alfresco/images/board2.png",
      "_portfolio/z2406-alfresco/images/board3.png",
      "_portfolio/z2406-alfresco/images/board4.png",
      "_portfolio/z2406-alfresco/images/board5.png",
      "_portfolio/z2406-alfresco/images/intro1.png",
      "_portfolio/z2406-alfresco/images/intro2.png",
      "_portfolio/z2406-alfresco/images/intro3.png",
      "_portfolio/z2406-alfresco/images/concept1.png",
      "_portfolio/z2406-alfresco/images/concept2.png",
      "_portfolio/z2406-alfresco/images/concept3.png",
      "_portfolio/z2406-alfresco/images/concept4.png",
      "_portfolio/z2406-alfresco/images/concept5.png",
      "_portfolio/z2406-alfresco/images/concept6.png",
      "_portfolio/z2406-alfresco/images/concept7.png",
      "_portfolio/z2406-alfresco/images/research1.png",
      "_portfolio/z2406-alfresco/images/research2.png",
      "_portfolio/z2406-alfresco/images/research3.png",
      "_portfolio/z2406-alfresco/images/research4.png",
      "_portfolio/z2406-alfresco/images/research5.png",
      "_portfolio/z2406-alfresco/images/research6.png",
      "_portfolio/z2406-alfresco/images/prototype1.png",
      "_portfolio/z2406-alfresco/images/prototype2.png",
      "_portfolio/z2406-alfresco/images/prototype3.png",
      "_portfolio/z2406-alfresco/images/prototype4.png",
      "_portfolio/z2406-alfresco/images/prototype5.png",
      "_portfolio/z2406-alfresco/images/deliver1.png",
      "_portfolio/z2406-alfresco/images/deliver2.png",
      "_portfolio/z2406-alfresco/images/deliver3.png",
      "_portfolio/z2406-alfresco/images/deliver4.png",
      "_portfolio/z2406-alfresco/images/deliver5.png",
      "_portfolio/z2406-alfresco/images/deliver6.png",
    ],
    tags: ["Product Design", "For Humanity"],
    featured: true,
    description: "A terracotta-based natural cooling system using evaporation, designed for installation in public fountains to cool cities in summer heat.",
    team: "Jian Jun, Wonyoung Lee, Zofia Marciniak, Jeanyoon Choi, Luca Trevisani",
    body: `
<img src='images/board1.png'>
<img src='images/board2.png'>
<img src='images/board3.png'>
<img src='images/board4.png'>
<img src='images/board5.png'>

# Working Log

# Introduction

<img src='images/intro1.png'>
<img src='images/intro2.png'>
<img src='images/intro3.png'>

# Concept

<img src='images/concept1.png'>
<img src='images/concept2.png'>
<img src='images/concept3.png'>
<img src='images/concept4.png'>
<img src='images/concept5.png'>
<img src='images/concept6.png'>
<img src='images/concept7.png'>

# Research

<img src='images/research1.png'>
<img src='images/research2.png'>
<img src='images/research3.png'>
<img src='images/research4.png'>
<img src='images/research5.png'>
<img src='images/research6.png'>

# Prototyping

<img src='images/prototype1.png'>
<img src='images/prototype2.png'>
<img src='images/prototype3.png'>
<img src='images/prototype4.png'>
<img src='images/prototype5.png'>

# Deliverables

<img src='images/deliver1.png'>
<img src='images/deliver2.png'>
<img src='images/deliver3.png'>
<img src='images/deliver4.png'>
<img src='images/deliver5.png'>
<img src='images/deliver6.png'>
    `,
  }
]
const ILLUSTRATIONS = [
  {
    id: "textureslicer-poster",
    title: "Poster for Texture Slicer",
    image: "images/Texture_Slicer_Poster.jpg",
    tags: ["Research", "Illustration"],
    featured: false,
    description: "A poster made during a difficult phase of the Texture Slicer project — playing in Illustrator helped restore passion and finish the paper.",
    team: "Solo project",
  },
  {
    id: "mixed-reality-concert-poster",
    title: "Mixed Reality Concert Poster",
    image: "images/concert-05.png",
    tags: ["Illustration", "Poster"],
    featured: false,
    description: "A poster for a mixed reality concert, performers and audience being both virtual and real. Assets and typography was inspired by the mixed reality theme.",
    team: "Solo project",
  },
  {
    id: "closet",
    title: "Out of the closet",
    image: "images/closet_1.png",
    tags: ["Graphic Design", "LGBTQIA+"],
    featured: false,
    description: "A small multiples graphic celebrating the vibrant diversity of the LGBTQIA+ community through cultural and fashion expressions.",
    team: "Solo project",
  },
  {
    id: "hanging",
    title: "Hanging In There",
    image: "images/hanging-in-there_square.png",
    tags: ["Illustration", "Personal"],
    featured: false,
    description: "A hand-drawn illustration exploring resilience — a girl holding onto a heart-shaped ring, trying to cover up the hole.",
    team: "Solo project",
  },
  {
    id: "love",
    title: "Love: Not For Sale",
    image: "images/love.png",
    tags: ["Personal", "Food"],
    featured: false,
    description: "A tribute to really delicious sandwiches my boyfriend cooked — sunny side up egg, ham, cheese, lettuce on roasted buns.",
    team: "Solo project",
  },
  {
    id: "goodmourning",
    title: "Good Mourning",
    image: "images/gm_artboard.png",
    tags: ["Personal Art"],
    featured: false,
    description: "An artboard inspired by the song 'good mourning' from my favourite Halsey album.",
    team: "Solo project",
  },
  {
    id: "wheel-illustration",
    title: "Wheel Illustration",
    image: "images/extra_wheel.png",
    tags: ["Illustration", "Personal"],
    featured: false,
    description: "A hand-drawn illustration of a wheel, exploring the concept of circular motion and its applications.",
    team: "Solo project",
  }
];

const FUN = [
  {
    id: "hat",
    title: "Pink Hat",
    type: "Crochet",
    year: 2022,
    images: ["fun/images/hat1.jpg", "fun/images/hat2.jpg"],
  },
  {
    id: "top",
    title: "Top",
    type: "Crochet",
    year: 2022,
    images: ["fun/images/top1.jpg", "fun/images/top2.jpg", "fun/images/top3.jpg"],
  },
  {
    id: "vest",
    title: "Crochet Ombree Vest",
    type: "Crochet",
    year: 2023,
    images: ["fun/images/vest1.jpg", "fun/images/vest2.jpg", "fun/images/vest3.jpg"],
  },
  {
    id: "color-set",
    title: "Bonnet and Wrist Warmers",
    type: "Crochet",
    year: 2024,
    images: ["fun/images/color_set.jpg", "fun/images/color_set2.jpg"],
  },
  {
    id: "color-vest",
    title: "Colorful Vest",
    type: "Crochet",
    year: 2024,
    images: ["fun/images/color_vest.jpg", "fun/images/color_vest1.jpg"],
  },
  {
    id: "punn-vest",
    title: "Vest for a friend",
    type: "Crochet",
    year: 2024,
    images: ["fun/images/punn_vest1.jpg", "fun/images/punn_vest2.jpg"],
    credit: "Pattern by day la hanh",
  },
  {
    id: "sweater-green",
    title: "Green Cat Sweater",
    type: "Crochet",
    year: 2025,
    images: ["fun/images/sweater_green.jpeg", "fun/images/sweater_green_1.jpeg", "fun/images/sweater_green_3.jpeg"],
  },
  {
    id: "sweater-blue",
    title: "Blue Sweater",
    type: "Tunisian Crochet",
    year: 2026,
    images: ["fun/images/sweater_blue.jpeg", "fun/images/sweater_blue_1.jpeg"],
  },
  {
    id: "white-shirt",
    title: "White Shirt",
    type: "Crochet",
    year: 2026,
    images: ["fun/images/white-shirt.jpeg", "fun/images/white-shirt1.jpeg"],
  },
  {
    id: "brown-shirt",
    title: "Brown Shirt",
    type: "Crochet",
    year: 2026,
    images: ["fun/images/brown-shirt.jpeg"],
  },
  {
    id: "fleamarket",
    title: "Flea Market Makes",
    type: "Crochet/Amigurumi",
    year: 2025,
    images: ["fun/images/fleamarket0.jpeg", "fun/images/fleamarket.jpeg","fun/images/fleamarket1.jpeg", "fun/images/fleamarket2.jpeg", "fun/images/fleamarket3.jpeg", "fun/images/fleamarket4.jpeg"],
  }
];
