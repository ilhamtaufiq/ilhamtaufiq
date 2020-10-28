---
title: Prolog Pohon Keluarga
description: Fakta dan relasi, rules, dan query.
date: 2020-10-28
tags:
  - Prolog
layout: layouts/post.njk
---

![Silsilah Keluarga](/img/keluarga.jpg)

Fakta dan relasi
```prolog
lakilaki(alan). 
lakilaki(mike). 
lakilaki(john). 
lakilaki(doni). 
lakilaki(anton). 
lakilaki(andre). 

perempuan(diana). 
perempuan(emi). 
perempuan(silvi). 
perempuan(melly).
perempuan(rossa). 


ayah(alan,emi).
ayah(alan,john).
ayah(mike,melly).
ayah(mike,doni).
ayah(mike,anton).
ayah(john,rossa). 
ayah(john,andre).
ibu(diana,emi).
ibu(diana,john).
ibu(emi,melly).
ibu(emi,doni).
ibu(emi,anton).
ibu(silvi,rossa).
ibu(silvi,andre).

menikah(alan,diana).
menikah(mike,emi).
menikah(john,silvi).
```
Rules
```prolog
orangtua(X,Y):-ayah(X,Y);ibu(X,Y).

anaklakilaki(C,P):-ayah(P,C),lakilaki(C).
anaklakilaki(C,P):-ibu(P,C),lakilaki(C).

anakperempuan(C,P):-ayah(P,C),perempuan(C).
anakperempuan(C,P):-ibu(P,C),perempuan(C).

kakek(K,C):-ayah(A,C),ayah(K,A).
kakek(K,C):-ibu(I,C),ayah(K,I).
nenek(N,C):-ayah(A,C),ibu(N,A).
nenek(N,C):-ibu(I,C),ibu(N,I).

nenek_kakek(X,Y):-kakek(X,Y);nenek(X,Y).

saudaraperempuan(B,C):-perempuan(B),ayah(A,B),ayah(A,C),ibu(I,B),ibu(I,C),\+(B==C).
saudaralakilaki(B,C):-lakilaki(B),ayah(A,B),ayah(A,C),ibu(I,B),ibu(I,C),\+(B==C).

saudarakandung(B,C):-ayah(A,B),ayah(A,C),ibu(I,B),ibu(I,C),\+(B==C).

saudarasepupu(X,Y):-ayah(A1,X),ayah(A2,Y),saudarakandung(A1,A2),\+(X==Y).
saudarasepupu(X,Y):-ayah(A,X),ibu(I,Y),saudarakandung(A,I),\+(X==Y).
saudarasepupu(X,Y):-ibu(I,X),ayah(A,Y),saudarakandung(I,A),\+(X==Y).
saudarasepupu(X,Y):-ibu(I1,X),ibu(I2,Y),saudarakandung(I1,I2),\+(X==Y). 

%Rules Tugas IBSP Mulai Dari Sini
paman(X,Y):-saudarasepupu(A,Y),ayah(X,A). %No. 1 Paman
bibi(X,Y):-saudarasepupu(A,Y),ibu(X,A). %No. 2 Bibi

istri(X,Y) :-perempuan(X),menikah(Y,X). %No. 3. Istri
suami(X,Y) :-lakilaki(X),menikah(X,Y). %No. 4. Suami

cucu(X, Y) :- nenek_kakek(Y, X). %No. 5 Cucu
cucu_lakilaki(X, Y) :- lakilaki(X), nenek_kakek(Y, X). %No. 6 Cucu Laki-laki
cucu_perempuan(X, Y) :- perempuan(X), nenek_kakek(Y, X). %No. 7 Cucu Perempuan

keponakan(X,Y):-keponakan_lakilaki(X,Y);keponakan_perempuan(X,Y), not(X=Y). %No. 8 Keponakan
keponakan_lakilaki(X,Y) :- paman(Y,X), lakilaki(X). %No. 9 Keponakan Laki-laki
keponakan_lakilaki(X,Y) :- bibi(Y,X), lakilaki(X). 
keponakan_perempuan(X,Y) :- paman(Y,X), perempuan(X). %No. 10 Keponakan Perempuan
keponakan_perempuan(X,Y) :- bibi(Y,X), perempuan(X).
```