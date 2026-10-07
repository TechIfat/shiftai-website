# The Same Question, a Different Sector: Can You Reconstruct One AI-Drafted Clinical Letter?

**Ifat Noreen**
Founder and Principal Agentic AI Architect, ShiftAi Systems Ltd
[PUBLICATION DATE]

---

On 29 July 2026 the MHRA published guidance on ambient voice technology, the AI scribes that listen to a consultation and draft the notes and letters that follow it. On the same day NHS England updated its own guidance on ambient scribing.

Much of the commentary read the MHRA guidance as relief. Scribes solely intended to transcribe, summarise or draft documentation for a clinician to review are not regulated as medical devices. For many suppliers, the registration question got simpler overnight.

I would read the other half of that day's publications before treating it as good news.

NHS England's guidance still tells deploying organisations to assign a Clinical Safety Officer, to complete their DCB0160 clinical safety documentation, including the safety case, hazard log and monitoring, and to complete a data protection impact assessment. Device status changes the registration question. It does not remove the clinical safety question, and it does not remove the evidence question underneath it.

In August I wrote about the question that eventually gets asked of every AI system in financial services: can you reconstruct one AI-assisted decision? Healthcare asks the same question in a different shape. Not one lending decision. One letter.

## Frameworks describe the organisation. Complaints are about one patient.

Most AI governance work in healthcare starts in the right place. A clinical safety officer is named. A hazard log is opened. A DPIA is written, often from NHS England's own template. The supplier has completed DTAC. The work is real and the intent is serious.

Then a patient, a GP or a coroner asks about one letter. A specific one. A named patient, a date, a sentence that turned out to matter. What did the tool hear, what did it draft, what did the clinician change, and who signed it?

The conversation changes shape immediately, because the safety case describes how the deployment manages risk in general, and the question is about one record in particular.

## For readers who do not spend their days in this

If your interest here is clinical or managerial rather than technical, two paragraphs will do.

When an AI scribe helps write a clinical letter, four things need to be recoverable afterwards. What the tool worked from, and which version of the tool it was. Proof that the signed letter has not changed since, and what the clinician changed between the AI's draft and the signed version. Where each clinical statement in the letter came from. And which person reviewed it, under whose clinical safety oversight.

The reason all four are needed together is that each one props up the others. A signed letter without the draft cannot show what the clinician actually checked. A draft without the version of the tool cannot be tied to a known behaviour. And a careful review is of limited use as evidence if nothing records that it happened as a step of its own, separate from the act of signing.

## The test

Take one AI-drafted letter from six months ago. Not a representative one. A specific one, preferably one where something was later questioned, because those are the ones that get examined.

Then time how long the organisation takes to produce four things: the product and version that drafted it, the AI draft and the signed letter side by side, the source of each clinical statement in it, and the names of the reviewing clinician and the clinical safety officer for the deployment.

I call this the reconstruction drill. I use it in preference to a maturity assessment for one reason. It produces a fact rather than an opinion. Nobody argues with a stopwatch.

## Where healthcare is different

The drill carries over from finance, with one important difference. In financial services, keeping more evidence is almost always safer. In healthcare it is not.

A consultation recording is some of the most sensitive data an organisation can hold. Retaining audio or full transcripts to make reconstruction easier creates its own data protection risk, and the DPIA may rightly decide to keep them only briefly, or not at all.

That changes what good looks like. The aim is not to keep everything. The aim is to keep the right things, for a period the DPIA has deliberately set, and to record that decision. Which is exactly why the draft, the differences and the review step matter so much: they can be kept when the audio cannot.

## The rubric

Score each dimension from 0 to 3. The criteria are written to be specific enough that two people applying them to the same letter reach the same score.

### Provenance: can you show what the tool worked from?

| Score | Criteria |
|---|---|
| 0 | Only the signed letter exists. Nothing records that AI was involved. |
| 1 | The product is named in the deployment record, but not the version used for this letter. |
| 2 | Product, version and configuration are recorded, but the AI draft was not retained. |
| 3 | Product, version and configuration are recorded against the letter. The AI draft is retained for a period set in the DPIA. Whether the transcript is kept, and for how long, is a recorded decision rather than a default. |

### Auditability: can you show what changed, and prove it has not changed since?

| Score | Criteria |
|---|---|
| 0 | The record does not show that the letter was AI-drafted. |
| 1 | The record shows the letter was edited, but not that the first version came from an AI tool. |
| 2 | AI involvement is flagged, but the differences between draft and signed letter cannot be recovered. |
| 3 | AI involvement is flagged. Draft and signed versions are both retained with timestamps, the differences are recoverable, and the record cannot be silently altered after signing. |

### Explainability: can each clinical statement be traced to its source?

| Score | Criteria |
|---|---|
| 0 | The letter alone. No way to tell where any statement came from. |
| 1 | Clinician review is assumed, because the letter was signed. |
| 2 | Review is recorded, but not at the level of individual statements. |
| 3 | During review, statements can be traced to the part of the consultation they came from. High-risk statements, such as medications, doses, allergies and anything phrased as a negative, are highlighted for checking before signing. |

That last criterion deserves a sentence of its own. "Patient denies chest pain" and "patient reports chest pain" differ by one word. A draft that reads fluently is not a draft that has been checked, and negatives are where a fluent summary is most likely to be confidently wrong.

### Accountability: can you name the people who owned it?

| Score | Criteria |
|---|---|
| 0 | No named individual. The letter is attributed to a system or a service. |
| 1 | A team owns the deployment. No individual is identified for this letter. |
| 2 | A named clinician signed the letter, but nothing distinguishes their review of the AI draft from the act of signing. |
| 3 | The clinician's review is recorded as a distinct step. The clinical safety officer for the deployment is named, and the hazard log contains an entry for AI drafting errors that is reviewed. |

### Scoring

| Total | What it means |
|---|---|
| 10 to 12 | A question about one letter can be answered from your records within hours. |
| 8 to 9 | Reconstruction is possible but manual, and depends on particular people being available. |
| 5 to 7 | You can describe what happened. You cannot evidence it. |
| 0 to 4 | A specific letter cannot currently be reconstructed. |

Score each deployment separately. Averages hide the one that will be examined.

## A worked example

The example below is constructed rather than drawn from any organisation. The patient, the clinic and the details are invented. The failure mode is the one this rubric was built to catch.

An outpatient clinic uses an AI scribe. After a follow-up appointment, the scribe drafts a letter to the patient's GP. The clinician reviews it at the end of a busy list and signs it. The letter says the patient is not currently taking their anticoagulant.

In the consultation, the patient had said they stopped it for a while because of bruising, and their GP restarted it last week.

Three months later, the GP practice raises a concern. The organisation can produce the signed letter, the name of the clinician who signed it, and the system audit trail showing when it was signed. It cannot produce the AI draft, because drafts were not kept. The transcript was deleted after a short period, as the DPIA required. The product version in use that day was not recorded against the letter.

Against the rubric: provenance scores 1, because the product is known but not the version. Auditability scores 1, because the record shows edits but not AI involvement. Explainability scores 1, because review is assumed from the signature. Accountability scores 2, because a named clinician signed, but review and signing were the same act.

Five out of twelve. A careful clinician, a sound deployment process, and a letter nobody can explain.

At level 3, the same concern is answered quickly, even though the transcript is still gone. The draft is retained and shows the scribe wrote "not currently taking". The recorded differences show the clinician did not change that sentence. The review step shows the medication statement was not one of those highlighted for checking, which is now a hazard log finding rather than a mystery. The concern can be answered on its merits, and the deployment can be fixed.

The transcript was deleted under the organisation's own rules, and rightly so. The evidence survived anyway, because the right things were kept.

## What a passing record contains

**AI involvement.** A flag on the letter showing it was AI-drafted.

**Product and configuration.** The product, its version as used that day, and any template or setting that shapes the draft.

**Draft and final.** The AI draft and the signed letter, both retained for a period the DPIA sets, with the differences recoverable.

**Review.** Who reviewed, when, and which high-risk statements were checked, recorded as a step separate from signing.

**Oversight.** The clinical safety officer for the deployment, and the hazard log entry that covers AI drafting errors.

**Retention decisions.** What was deliberately not kept, such as audio, and for how long the rest is kept, as recorded decisions.

None of this is exotic. What makes it rare is that every field has to be captured at the moment the letter is written. None of it can be reconstructed afterwards.

## What this does not fix

Three honest limits, because a governance argument that claims too much becomes the thing it is arguing against.

This rubric measures whether a letter can be reconstructed. It does not measure whether the scribe is clinically accurate. A deployment could score twelve out of twelve and still produce poor drafts, with excellent records of having produced them. Evaluation and monitoring are separate work.

Nor does it replace DCB0160, the DPIA or DTAC. It sits underneath them. The safety case says how risk is managed. This is the evidence that the management happened, one letter at a time.

And it does not settle the tension between evidence and privacy. It only insists that the tension is resolved deliberately, in the DPIA, rather than by whatever the product happens to keep by default.

## The question worth asking

You do not need a new framework for any of this. You need one question, put to every AI deployment that touches what goes into a patient's record.

If a patient asked you today why one specific sentence is in their letter, what could you actually produce?

If the answer is a safety case, a DPIA and a description of the review process, you have described your deployment.

If the answer is the draft, what the clinician changed, the statements that were checked, and the names of the people who owned it, you have evidence.

Only one of those survives being asked twice.

---

*Sources: Medicines and Healthcare products Regulatory Agency, Ambient voice technology-enabled products, 29 July 2026.*

*NHS England, Guidance on the use of AI-enabled ambient scribing products in health and care settings (Version 3, updated 29 July 2026).*

*NHS England Transformation Directorate, Using AI-enabled ambient scribing products in health and care settings: guidance for information governance professionals, including the template DPIA (March 2026).*

*NHS England, DCB0129: Clinical Risk Management: its Application in the Manufacture of Health IT Systems; DCB0160: Clinical Risk Management: its Application in the Deployment and Use of Health IT Systems.*

*NHS England, Digital Technology Assessment Criteria (DTAC).*

---

> *Ifat Noreen is Founder and Principal Agentic AI Architect at ShiftAi Systems Ltd, a UK AI governance consultancy working across regulated financial services and healthcare. ShiftAi is independent and is not affiliated with or endorsed by the NHS.*
