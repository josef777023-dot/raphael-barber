GOAL:    the viewer remembers the order (wet, soap, scrub 20 s, rinse) and the number 20.
OUTPUT:  HyperFrames, 1920 x 1080, 30 fps
TIME:    15 s x 30 = 450 frames; silent (≤15 s, no music asked)
LOOK:    ground: bathroom tile wall #D6ECEC with 4 px white grout every 120 px, no gradient;
         ink #123A40; one accent #B8561A only on step numerals and the "20";
         display Heebo 900, step labels 88 px, hook 104 px, -1% tracking; sub-lines Heebo 400 40 px;
         medium: flat vector bathroom objects with one shade tone each, no glow, no shadows over 0.15 opacity.
OBJECTS: chrome tap with handle and wall mount; water stream (#8CCFE6, 0.75); two hands with sleeves
         (skin #F1C3A0, shade #DFA481, sleeve #2F6F73); soap pump bottle (#9AD3C4, white pump);
         foam bubbles (white, stroke #9CC9D0); germs (#7BAE3B blobs, darker outline, two dot eyes);
         white ceramic basin; a 20 s timer ring.
MOTION:  arrivals expo.out 0.5–0.7 s; label swaps = blur swap (out 0.18 s power2.in, in 0.2 s expo.out);
         rubbing = hands x ±26 px, 0.25 s per stroke, sine.inOut, finite repeat; germs shrink 1 → 0 power3.in.
SHOTS:   0.0–2.4  germs pop onto still hands (stagger 80 ms); hook "ידיים נראות נקיות?" per-word blur-in.
         2.4–4.4  water stream drops from the tap onto the hands, droplets appear; "1 להרטיב".
         4.4–6.4  pump presses, a soap drop arcs to the palms, foam grows; "2 סבון".
         6.4–10.6 hands rub, foam grows, germs vanish one by one, timer 0 → 20 (marked accelerated); "3 לשפשף 20 שניות".
         10.6–12.6 water returns, foam slides down and fades; "4 לשטוף ולייבש".
         12.6–15.0 water off, clean hands still; end line "20 שניות של סבון. ידיים נקיות." holds 2.4 s.
BANNED:  dark void; glow; purple/blue gradients; glass cards; cream paper + serif; everything fading up;
         text moving while read; corner labels; logo in a corner; looping breathe/pulse.
QA:      t=1.8 (germs + hook), 3.6 (water), 5.8 (foam), 8.5 (rubbing + timer), 11.6 (rinse), 14.5 (end line).
