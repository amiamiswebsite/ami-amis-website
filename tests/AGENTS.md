# Tests

- Screenshots zijn reviewbewijs, geen doel op zich. Update baselines alleen na visuele inspectie.
- Test primaire routes én alle case-URLs op status, consolefouten, overflow en landmarks.
- Kernstates omvatten menu, modals, video, formulieren, keyboard-only en reduced motion.
- Gebruik stabiele selectors op rol/naam of `data-testid`; koppel tests niet onnodig aan CSS-details.
- Een externe Vimeo-fout mag alleen expliciet en minimaal worden geallowlist; eigen resourcefouten nooit.
