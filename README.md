This README is also available in:
# Can-Tong · Cantonese Expression Helper

🗣️ Type in **Mandarin / English / Cantonese**, and get **authentic Cantonese writing + audio + example-based explanations**.  
🌐 Try it online: https://can-tong.vercel.app/  
🐦 X / Twitter: [@oceanguest](https://x.com/oceanguest) – I post dev logs, lexicon progress and calls for new word ideas here.

---

## Overview (English)

Can-Tong is a tiny helper tool focused on **real-life Cantonese expressions**.  
You type in Chinese or English, and we do our best to match it with the right Cantonese wording, pronunciation and a short explanation, so you can see how people actually say things in Cantonese.

---

## 🚀 Quick Start (for regular users)

👉 The easiest way to use it: **just open the website**

1. Open: https://can-tong.vercel.app/  
2. In the search box, type for example:  
   - Mandarin: 不好意思, 失礼了…  
   - English: so sorry, excuse me  

3. If we have a match, the page will show:  
   - ✅ Cantonese wording (Traditional Chinese)  
   - 🔊 Cantonese audio (click to play)  
   - 💬 A short explanation + usage notes  
   - 📌 Related example sentences (if already collected)  

> Profanity content will later be controlled via a “profanity / R18 toggle”, so you can choose whether to see it.

Right now we’re in an **open MVP testing** phase.  
The number of entries is still small (the lexicon is slowly “fattening up” 🍲).  
If you can’t find what you need, you’re very welcome to help fill the gaps (see “How to contribute entries” below).

---

## ✨ What makes it different?

- **Trilingual perspective** – Every expression is explained through **Mandarin / Cantonese / English** lenses, instead of just giving you one direct translation.  
- **Real-life context** – Entries are taken as much as possible from social media, movie dialogue and daily conversations, not just textbook examples.  
- **No account, no ads** – During the MVP phase it’s completely free to use, no login required, and there are no ads.  
- **Indie & opinionated** – It’s built and maintained by one person. Progress is public, feedback is welcome, and lexicon quality is curated carefully.

---

## 🎯 Who is this for?

- **People learning Cantonese** who want to know not only “what this word means”, but also “what people actually say” and “why they say it that way”.  
- **Creators writing for social media** who want to write captions / jokes in Cantonese without using the wrong character or tone.  
- **Overseas Chinese / Cantonese speakers** who want to keep their Cantonese alive and write closer to how people in Hong Kong / Cantonese-speaking regions really talk.  
- **Language / NLP enthusiasts** interested in Cantonese corpora and how expressions evolve over time.

---

## 🧭 Roadmap & Vision

### Short-term (MVP phase)

- 📚 Build a **high-quality core lexicon** before chasing pure volume:  
  - Focus on common internet slang, emotional expressions and everyday conversations.  
- 🧵 Add more **example sentences** and “common mistake alerts”.  
- 🔊 Improve Cantonese TTS so the pronunciation is natural and consistent.  
- 🧩 Add a **profanity / R18 toggle**, so users can decide whether to see sensitive content.

### Mid-term

- 🧠 Build a more systematic **trilingual knowledge base of local expressions**,  
  to make it easier to train future AI agents that understand real-life Cantonese.  
- 🌍 Polish the English UI so non-Chinese speakers can also use the tool.  
- 🧪 Offer a simple API for experiments  
  (e.g. input a Mandarin sentence → return several Cantonese variants).

### Long-term vision

I hope Can-Tong can become a tool that people **naturally open whenever they want to say something in real Cantonese**,  
not just a one-off toy project.

---

## 🙋‍♀️ How to contribute entries

The crowdsourcing flow is still pretty primitive, but you can already join in and help.

### Option 1 — Public form / spreadsheet

📎 Form link (example):  
👉 Insert your Google Form / Sheet link here

In the form, you can provide:

- Original Chinese meaning / context  
- Local Cantonese phrasing (Traditional Chinese)  
- Corresponding English interpretation / explanation  
- Example sentence(s) & usage notes  
- Whether it is profanity (checkbox – this helps us wire it up to the profanity toggle later)

By submitting the form, you agree that:

- Your submission is licensed for long-term use by the Can-Tong project worldwide,  
  including but not limited to: being shown on the website / mini-programs, being整理ed into the lexicon,  
  being used as future AI / language model training data,  
  and being used in commercial products related to this project;  
- When we display it publicly, you may choose to be credited or stay anonymous  
  (you can write your preferred credit name in the form or tick “anonymous”).

---

### Option 2 — Feishu (Lark) multi-dimensional sheet  
*(recommended for contributors based in Mainland China)*

📎 Feishu sheet link:  
👉 Insert your Feishu sheet link here

If Google is hard to access where you are, you can contribute via Feishu:

1. Open the Feishu sheet link (mobile app or web).  
2. Find the active view (for example “Core entries collection”, “Example sentences”, etc.).  
3. Fill in the fields you want to contribute to, including:  
   - Original Chinese meaning / context  
   - Local Cantonese phrasing (Traditional Chinese)  
   - English interpretation / explanation  
   - Example sentence(s) & usage notes  
   - Whether it is profanity / R18 (checkbox)

Submitting via Feishu also means that you agree:

- Your entries can be used long-term by the Can-Tong project, including for later commercial products and AI / language model training;  
- You may be credited by name or stay anonymous (just leave your preference as a note in the sheet).

---

Whichever way you contribute:

- I read every single submission;  
- For each small release, I’ll thank contributors in the README / on X  
  (you can remain anonymous and just be mentioned as a “kind contributor”).

---

## 🛠️ Local development (for developers)

⚠️ Please note:

- The **code** (frontend + basic glue logic) is open source.  
- The **core CSV lexicon** is a protected asset: only a read-only public subset is exposed;  
  the full version will not be stored in the public repo.

---

## 🤝 Thanks

Huge thanks to everyone who’s willing to contribute to Cantonese 🙏  
Whether it’s a single word, an example sentence or a tiny bug report,  
you’re helping Cantonese expressions be better preserved and used.

If you find this project meaningful, you can:

- ⭐ Star the repo  
- 🔁 Share it with friends who like Cantonese  
- 📝 Suggest one expression you really wish you could look up, but can’t find yet  
