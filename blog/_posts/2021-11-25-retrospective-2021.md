---
layout: post
title: "The Return of the Guy (+ my most complex project yet)"
visible: true
---

Wow, it's hard to believe it's been half a year since my last post. So much has happened in that time! I had a summer internship where I learned a ton of great stuff and have been making my way through my penultimate semester of my senior year in college. There are a few things I'd like to talk about, including exciting news about [@gptupaguy](https://twitter.com/gptupaguy)!

----

# <img src="/blog/images/retrospective-2021/genni-icon.png" alt="The main interface for Genni" style="height: 1em;"> Genni - GPT for everyone!
When I haven't been studying for school, or working on projects for my job, or resting, I've been spending my time developing a desktop application that aims to make GPT text generation more accessible. I'm calling it **Genni**, and I'm quite happy with it so far. In fact, I think it may be one of my most complex-but-useful projects yet!

<div class="text-center mb-3">
    <img src="/blog/images/retrospective-2021/genni-ui.png" alt="The main interface for Genni" class="img-fluid">
</div>

Genni is a fancy wrapper around the Python library [aitextgen](https://github.com/minimaxir/aitextgen) by [Max Woolf (@minimaxir)](https://twitter.com/minimaxir) that lets you train Hugging Face GPT models and generate text from them with just a few clicks. With its dataset-building tools, creating a model finetuned on a Twitter account is super easy!

<ol>
    <li>
        Add a dataset based on a Twitter search with the format <code class="language-plaintext highlighter-rouge">"from:twitter_handle"</code>. Genni downloads all of the Tweets it can find from @twitter_handle using the Python library <a href="https://github.com/JustAnotherArchivist/snscrape">snscrape</a> and stores them in a file for you.
        <div class="container mt-3 mb-3">
            <div class="row">
                <div class="col-sm">
                    <img src="/blog/images/retrospective-2021/genni-step1-choosetwitter.png" alt="The 'Add Dataset' screen in Genni; 'Twitter' is selected as the source." class="img-fluid mx-auto d-block">
                </div>
                <div class="col-sm">
                    <img src="/blog/images/retrospective-2021/genni-step1-search.png" alt="The 'Add Dataset from Twitter' screen in Genni; 'from:_Meorge' is entered as the search query." class="img-fluid mx-auto d-block">
                </div>
            </div>
            Once it's done, you'll be able to view your new dataset! (Please forgive the nihilism and seatbelt safety discourse.)
            <div class="row">
                <div class="col-sm">
                    <img src="/blog/images/retrospective-2021/genni-step1-dataset.png" alt="Genni's main interface after Tweets from @_Meorge (i.e. me) have been downloaded. There's a bunch of text being shown - too much to put here, but they're all Tweets from my account." class="img-fluid mx-auto d-block">
                </div>
            </div>
        </div>
    </li>
    <li>
        Click "Train" and choose a Hugging Face base model. I typically like to use <code class="language-plaintext highlighter-rouge">"EleutherAI/gpt-neo-125M"</code>. Set the hyperparameters (or just go with the default) and click "Start Training".
        <div class="container mt-3 mb-3">
            <div class="row">
                <div class="col-sm">
                    <img src="/blog/images/retrospective-2021/genni-step2-hf.png" alt="The 'Initialize Repository' screen in Genni; 'Hugging Face Repository' is selected as the base model source." class="img-fluid mx-auto d-block">
                </div>
                <div class="col-sm">
                    <img src="/blog/images/retrospective-2021/genni-step2-choosemodel.png" alt="The 'Select Hugging Face Repository' screen in Genni; 'EleutherAI/gpt-neo-125M' is entered as the repository name." class="img-fluid mx-auto d-block">
                </div>
            </div>
            <div class="row">
                <div class="col-sm">
                    <img src="/blog/images/retrospective-2021/genni-step2-hyperparams.png" alt="The 'Configure Training' screen in Genni; the user is able to enter hyperparameters, such as the source dataset, number of training steps, and learning rate." class="img-fluid mx-auto d-block">
                </div>
            </div>
        </div>
    </li>
    <li>
        Watch as your model trains!
        <div class="container mt-3 mb-3">
            <div class="row">
                <img src="/blog/images/retrospective-2021/genni-step3.png" alt="The 'Training in Progress' screen in Genni. On the left are statistics about the training (such as that 21 minutes have passed, training is on step 24 of 100, and the average loss is 4.41), and on the right is a graph of the loss and average loss." class="img-fluid mx-auto d-block">
            </div>
        </div>
    </li>
</ol>

If you're interested, you can [find Genni on my GitHub repository](https://github.com/Meorge/Genni). There isn't currently a standalone executable you can run for it - you'll need to install Python and the necessary dependencies, as outlined in the README - but I promise it's not too hard to get set up. It'd be great to have more people using the software, so that I can find out what needs to be changed or fixed to make it the best it can be!

# The Return of the (GPT Up a) Guy
What does this Genni stuff mean for [@gptupaguy](https://twitter.com/gptupaguy)? Because it makes it easier for me to generate and curate models, I'll be able to start scheduling posts for the bot again!

There's also a lot more training data for the bot to work with this time around. The most recent dataset I had, pre-Genni, contained 2,997 Tweets from [@makeupaguy](https://twitter.com/makeupaguy) and several parody accounts. Using Genni, I was able to assemble a dataset consisting of **11,421 Tweets from [@makeupaguy](https://twitter.com/makeupaguy) alone!**

In the coming days, I'm hoping to spend some time generating posts and get them queued up to be Tweeted out.

# Other Twitter bots, too...?
In my previous post, I talked about how I wanted to start a bot based on the [@KidsWriteJokes](https://twitter.com/KidsWriteJokes) Twitter account, and shared a few examples of the model's output. As I've been working on Genni, I've created a new model based on the account's Tweets which has provided more hilariously bizarre results. I don't currently have a timeline on when the bot will be up and running, but I'm hoping to get it set up soon!

As you might have noticed in my screenshots above, I've also given a shot at training a model based on [@jigsaw_quotes](https://twitter.com/jigsaw_quotes), since I enjoyed the account so much. Admittedly, its output hasn't been quite as interesting as the other models, so I might have to put it off until there are more Tweets to build a dataset out of.

# Wrapping up
The next few weeks are going to be pretty packed for me - I'm finishing up my penultimate semester in undergraduate school, and may also be applying to graduate school for next year. On top of that, I've also got my internship/job to work on! But I'm hoping that I'll have some fun stuff up and running by the end of the year. You can stay up to date on my shenanigans via my [Twitter account, @_Meorge](https://twitter.com/_Meorge).