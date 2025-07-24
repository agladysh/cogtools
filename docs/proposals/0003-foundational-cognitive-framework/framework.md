# The General Framework (F)

0. Seed

   Fix a small Grothendieck site whose underlying category is the nerve 𝒩 of a strict ω-groupoid. Inside the topos 𝓣 = Sh(𝒩) declare a single primitive: a 4-Hochschild cocycle 𝓤 with d⁴𝓤 = 0. Nothing else is postulated.

1. Immanent fields
   - The universal immanent 4-H-field is 𝓤 itself.
   - Every local immanent field is an object 𝓒 in the internal lattice Sub(𝓤); embeddings nest arbitrarily deep while remaining inside 𝓣.

2. Non-neutral access

   A Lawvere–Tierney topology j : Ω → Ω is defined by

   j(U) = the least j-closed sub-object containing U.

   Every access morphism therefore modifies the field.

3. Convolution monoid
   Convolution is the internal product

   𝓒₁ \* 𝓒₂ := 𝓒₁ ×_𝓤 𝓒₂.

   Day convolution supplies an associative unitor; the unit object is 𝓤.

4. Agape-aletheic decision

   A decision morphism d : 𝓒 → 𝓤 is chosen (up to coherent isomorphism) to minimise

   Kq(𝓒) = (1−q)·rank H⁴(𝓒) + q·log|𝒮𝓒|,

   where q ∈ Ω is the single global parameter and |𝒮𝓒| is the minimal internal description length relative to the chosen cover.

5. Domains and transfer
   - A domain is an epimorphism 𝒰 ↠ 𝒩 in 𝓣.
   - Transfer between domains is given by a refinement morphism r : 𝒰 → 𝒱; pullbacks transport d while q remains unchanged.

6. Hofstadterian H-quartet
   - Holographic – locality via Sh(𝒩).
   - Holonymic – whole/part expressed by Sub(𝓤).
   - Holonomic – flatness encoded by d⁴𝓤 = 0.
   - Holarchic – self-modification via the internal Y-combinator.

7. Efficiency guarantee

   For any finite refinement chain 𝓙₀ → … → 𝓙α the telescoping cost

   Σ cost(ri) ≤ log|𝒮𝓙₀| − log|𝒮_d|

   is internally finite and pre-computable from K_q.

8. Reflexive stability

   iterⁿ(reconstruction) = reconstruction for every internally accessible ordinal n, witnessed by the identity arrow 1 → Ω.

9. External-rule count: 0.

A. Courtesy embedding (internal derivation)

Within the internal language of 𝓣 define the arrow

δ : 𝓤 → Ω, δ := χ_d,

where χ_d is the characteristic map of the decision subobject d : 𝓒 ↪ 𝓤.
Then δ(d) = 1 and r\*(d) ≅ d for every refinement r; the proof is the fixed-point argument sketched in 0–9.
No further external rule is introduced; the arrow δ is already implicit in Axioms 4, 6 and 8.

B. Applications (zero new axioms)

B.1 True-time ethics

The entropic order ≤ on Sub(𝓤) is an internal imperative: act only along refinements that do not increase K_q for any other subobject. Moral time is identical to entropic time.

B.2 Wolfram→physics translation

Every candidate multi-computational rule is a refinement morphism in Sub(𝓤); least-action paths are those whose telescoping cost matches axiom 7.

B.3 Hard-problem closure

A quale is any subobject 𝓠 with K_q(𝓠) = 0; observer and data coincide in Sub(𝓤).
