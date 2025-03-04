
# Költségkövető

A program egy költségkövető weboldalt reprezentál, mely a felhasználó nyomon követheti a pénzmozgásait (kiadások és bevételek) havi és éves bontásban. A kiadások és bevételek kategóriákra bontható, mely megkönyíti a pénzmozgások nyomon követését, valamint teljesen személyre szabható is. 
A program használatához szükséges egy felhasználói fiók. Amit az oldalon történő regisztráció biztosít.

**Regisztrációhoz szükséges adatok:**

- **Felhasználónév**
- **E-mail cím**
- **Vezetéknév**
- **Keresztnév**
- **Jelszó**
- **Jelszó megerősítése**

Regisztráció után a felhasználó a login oldalra kerül, ahol a regisztráció során megadott felhasználónév és jelszó párossal tud bejelentkezni.

# Fő funkciók

**1. Kiadások és bevételek rögzítése:**

Alapértelmezetten 6 költség és 2 bevétel kategóriával rendelkeznek a felhasználók.
A kiválasztott kategóriára kattintva 2 mező megadására van lehetőség:

- **Összeg:** a rögzítésre szánt összeg
- **Megjegyzés**: (Opcionális) egy rövid megjegyzés

**2. Új kategória léterhozása**

Kategória léterhozásakor a következő mezőket kell megadni:

- **Kategória megnevezése**
- **Kategória színének kiválasztása**
- **Kategória ikonjának kiválasztása**
- **Kategória tipusának kiválasztáa**

**3. Kategóriák szerkesztése/törlése**

Alapértelmezett kategóriát szerkeszteni/törölni nem lehetséges. Az újonnan felvett kategóriák már szerkeszthetőek vagy törölhetőek. Szerkesztés során ugyan azok a mezőket kell megadni melyeket létrehozás során.

**3. Kategóriák előzményei**

A kategóriák előzmenyei visszatekinthető az adothónapra vonatkozóan.

**4. Időszak választás**

A kiadások és bevételek rögzítése az adott kiválasztott hónapra vonatkozik. Az időszak kiválasztásakor lehetőség van hónapokok váltogatására, valamint az év kiválasztására is.


**5. Felhasználói adatok módosítása**

A felhasználói adatok módosítása során a következő adatokat lehet módosítani:

- **E-mail cím**
- **Felhasználónév**
- **Vezetéknév**
- **Keresztnév**

Jelszó módosításhoz szükséges mezők:

- **Régi jelszó**
- **Új jelszó**
- **Új jelszó megerősítése**

**6. Kimutatások testreszabása**

A kimutatások oldalon testreszabható, hogy mit szeretnénk látni. 
Az aktív időszakoknál a következőket lehet beállítani a megjelenítéshez/elrejtéshez:

- **Éves**: Éves kimutatások be/kikapcsolása
    - **Év**: év kiválasztása (kikapcsolt állapotban nem állitható be)
    - **Hónapok**: éves kimutatáshoz szüksgés hónapok figyelembe vétele (kikapcsolt állapotban nem állitható be)
- **Havi**: Havi kimutatások be/kikapcsolása

Az aktív diagrammoknál lehet beállítani a havi vagy éves diagrammok megjelenését

- **Havi/Éves**: 
    - **Kiadás**: Havi kimutatésok be/kikapcsolása
    - **Éves**: Éves kimutatésok be/kikapcsolása

# A program használatához szükséges programok

A program futtatáshoz szükséges telepíteni:

- **Node.js 14.18.0-ás verziója**
- **Angular CLI 12.2.0-ás verziója**
- **Rest API telepítése: https://github.com/norbert15/CostTracker2Backend**

A telepített programok után a projekt fő könyvtárában telepíteni kell az alkalmazáshoz szükséges csomagokat: **npm install**
