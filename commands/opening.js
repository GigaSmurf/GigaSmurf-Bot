const Discord = require('discord.js');

module.exports = {
    name: 'opening',
    description: 'This shows the details of a certain opening!',
    execute(message,args){
        let opening = args.slice(1).join(" ");
      let name = "";
      let desc = "";
      let pros = "";
      let cons = "";
      let image = "";
      if(opening.toLowerCase().includes('sicilian')){
                if(opening.toLowerCase().includes('alapin')){
                  name = "Sicilian Defense: Alapin Variation";
                desc ="1.e4 c5 2.c3\nWhite does not have to combat the Sicilian by playing with 2.Nf3 and 3.d4; one way to avoid the main lines is to prepare d2-d4 by playing 2.c3, planning to recapture with the pawn. This leads to completely different kinds of positions, and is known as the Alapin.";
                pros = "White avoids trading a central pawn for a wing pawn\nLeads to open, active play\nTricky\n";
                cons = "Blocks the c3 square for the Nb1\nDoes not develop a piece\nAllows Black a large choice of ways to respond\n";
                image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bUNZSWtz.gif";
                }
                else if (opening.toLowerCase().includes('closed')){
                  name = "Sicilian Defense: Closed";
                desc ="1.e4 c5 2.Nc3\nThe 2.Nc3 of the Closed Sicilian introduces a slower way of building up. Rather than breaking Black's grip on d4 with a quick d2-d4, White plays 2.Nc3 followed by fianchettoing the king bishop, sometimes with a slow attack on the kingside in mind.";
                pros = "Avoids the heavy theory of the Open Sicilian\nLeads to a slower, strategic type of play, undesirable for many Sicilian players\n";
                cons = "Allows Black to develop his pieces comfortably\nGives Black a good plan of attack with ...b5\nLeaves Black with good control of the d4 square\n";
                image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bUNZSWJz.gif";
                }
                else{
                name = "Sicilian Defense";
                desc = "1.e4 c5\nThe Sicilian is one of the major answers to 1.e4. Black takes control of the d4 square with a pawn from the side - thus he imbalances the position and avoids giving White a central target.";
                pros = "Unbalances the game\nGives Black good chances of attack\nGreat opening when you need to play for a win";
                cons = "White has many ways to meet the Sicilian\nIn the main variations White gets great attacking chances\nThere is a lot of theory";
                image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bUNZSQ,,.gif";}
      }
      else if (opening.toLowerCase().includes('french')){
        name = "French Defense";
        desc ="1.e4 e6\nThe French Defense meets 1.e4 with 1...e6, preparing to counter the e4 pawn with 2...d5. Black blocks in their light-squared bishop, but gains a solid pawn chain and counter-attacking possibilities. The French Defense is named after a 1834 correspondence game between the cities of London and Paris, in which the French defense was utilized. ";
        pros = "Sound structure\nSharp counterattacking possibilities\nOriginal type of game\n";
        cons = "Black has a space disadvantage\nLight-squared bishop is locked in\nCan become passive\n";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bUMwUw,,.gif";
      }
      else if (opening.toLowerCase().includes('ruy') || opening.toLowerCase().includes('lopez')){
        name = "Ruy López Opening";
        desc ="1.e4 e5 2.Nf3 Nc6 3.Bb5\nAlso called the 'Spanish Game', the Ruy Lopez is one of the most popular openings in chess. White's 3.Bb5 move puts pressure on the knight which is guarding the center, while developing rapidly. The opening is named after the sixteenth-century Spanish priest Ruy Lopez de Segura.";
        pros = "Leads to very complex and multifaceted play\nTends to give White long-term pressure\nWhite develops rapidly and castles quickly\n";
        cons = "Some lines are very theoretical\nBlack has a huge number of defenses to choose from\nSometimes Black gets a chance to later attack the light-squared bishop\n";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bUMwS2d2NVFmSA,,.gif";
      }
      else if (opening.toLowerCase().includes('caro') || opening.toLowerCase().includes('kann')){
        name = "Caro-Kann Defense";
        desc ="1.e4 c6\nThe Caro-Kann was named after Horatio Caro and Marcus Kann who analyzed it in 1886. Black supports the move ...d5, to challenge the e4 pawn, while being ready to recapture. The Caro-Kann is considered to be a fairly solid, quiet opening.";
        pros = "Sound pawn structure\nFree light-squared bishop\nSafe\n";
        cons = "Less space for black\nSlower development\nLess complicated game\n";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bUNZUQ,,.gif";
      }
      else if (opening.toLowerCase().includes('italian')){
        name = "Italian Game";
        desc ="1.e4 e5 2.Nf3 Nc6 3.Bc4\nIn the Italian game - first played by Italian chess masters as long ago as the sixteenth century - White develops the bishop to a strong diagonal, aiming through the center at f7. Depending on how the players continue, it may turn into open, gambit play; or slower, maneuvering play.";
        pros = "Natural play\nFocus on the center\nRapid development\n";
        cons = "The bishop on c4 might be exposed\nBlack's center is not under immediate pressure\n";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bUMwS2d2NVFmQQ,,.gif";
      }
      else if (opening.toLowerCase().includes('scandinavian')){
        name = "Scandinavian Defense";
        desc ="1.e4 d5\nIn the Scandinavian Defense, Black meets 1.e4 by immediately putting the question to the e4 pawn, attacking it with 1...d5. This opening often leads to tricky, scrappy play by Black.";
        pros = "A provocative opening\nBlack opens the game immediately\nUsually both black bishops have freedom\n";
        cons = "After the capture 2.exd5, Black loses time recapturing\nUsually the white d-pawn will go to d4 afterwards, giving more central space\nBecause Black loses some time, he is in danger of a quick knockout\n";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bUNaSg,,.gif";
      }
      else if (opening.toLowerCase().includes('pirc')){
        name = "Pirc Defense: 2.d4 Nf6";
        desc ="1.e4 d6 2.d4 Nf6\nThe Pirc (prounounced 'Peerts') is a newer, radical kind of opening, in which Black allows White to occupy the center with pawns, and then attempts to counterattack the pawn center and prove it to be over-extended. It is named after the Slovenian Grandmaster Vasja Pirc. The Pirc Defense always involves the fianchetto of the black king's bishop; if the move ...g6 is not played soon, then it is not the Pirc.";
        pros = "Black has a lot of freedom of different ways to play\nA tricky, active defense\nWhite can be provoked easily\n";
        cons = "White has several systems which lead to a raging attack\nWhite can also play carefully to restrict Black\nWhite has many different ways to combat the Pirc\n";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bUNaUmxCIVQ,.gif";
      }
      else if (opening.toLowerCase().includes('alekhine')){
        name = "Alekhine's Defense";
        desc ="1.e4 Nf6\nA radical defense, first introduced to master chess by the fourth world champion, Alexander Alekhine. Black immediately attacks the e4 pawn with his knight, tempting White to advance all of his center pawns in the hope that they will prove over-extended.";
        pros = "Original\nTricky\nLess common, so opponents won't know as much\n";
        cons = "White gains central space\nBlack has to move the knight several times\nRisky\n";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bUMhVA,,.gif";
      }
      else if (opening.toLowerCase().includes('king')){
        if(opening.toLowerCase().includes('gambit')){
        name = "King's Gambit";
        desc ="1.e4 e5 2.f4\nThe ancient King's Gambit is an opening beloved by Romantics. White sacrifices the f-pawn to knock out Black's central e5 pawn. Ideally White would like to take over the center and regain the pawn on f4.";
        pros = "Very exciting opening\nWhite goes for the initiative\nUnusual positional themes\n";
        cons = "Black has many different options to choose from\nBlack can decline the gambit in a number of ways\nWhite's king can become exposed\n";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bUMwS25E.gif";}
        else if(opening.toLowerCase().includes('defense')){
          name = "King's Indian Defense";
        desc ="1.d4 Nf6 2.c4 g6\nThe King's Indian Defense is a 'hypermodern' defense, which involves the fianchetto of the black king's-bishop, combined with ...d6 (not ...d5). Black allows White to build a strong pawn center and then later hits back with moves such as ...e5 or ...c5.";
        pros = "Sharp opening\nLeads to fascinating positions\nBlack often gets attack against the white king\n";
        cons = "White usually gets a space advantage\nTypically White gets strong pressure on the queenside\nThere are decent responses for every style of player\n";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bEIhVGtBMlU,.gif";
        }
        else {
          name = "King's Indian Attack";
        desc ="1.Nf3 d5 2.g3\nThe fastest way to fianchetto the king's-bishop and castle is the King's Indian Attack - the reverse of the King's Indian Defense. White just plays Nf3, g3, Bg2, and 0-0, before seeing how to proceed. Normally Black puts some pawns in the center and White hits back with e2-e4.";
        pros = "Flexible\nMay lead to a kingside attack\nNot very theoretical\n";
        cons = "Allows Black a strong center\nGives Black many different options\nDoes not put immediate pressure on Black\n";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/Z3ZaSm93.gif";
        }
      }
      else if (opening.toLowerCase().includes('scotch')){
        name = "Scotch Game";
        desc ="1.e4 e5 2.Nf3 Nc6 3.d4\nRather than develop another piece, in the Scotch Game White chooses to break open the center, challenging the e5 pawn. This opening was named after an 1824 correspondence game between Edinburgh and London.";
        pros = "White virtually guarantees himself a space advantage\nBlack is unable to maintain the e5 point\nAvoids the well-analyzed Ruy Lopez\n";
        cons = "Releases the tension very early\nRecapturing the d4 pawn will require a second move by the white knight\nThe e4 pawn can later come under attack\n";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bUMwS2d2NVFsQg,,.gif";
      }
      else if (opening.toLowerCase().includes('slav')){
        name = "Slav Defense";
        desc ="1.d4 d5 2.c4 c6\nWith the Slav Defense, Black supports his attacked d5-pawn with the c-pawn. This way he is able to recapture on d5 with the pawn, maintaining a strong central point; while he also avoids blocking in the queen's-bishop.";
        pros = "The bishop on c8 is not impeded\nBlack maintains a solid central point\nThe c4 pawn might soon be attacked\n";
        cons = "Black's development is slower\nHitting back with ...c5 will lose a move\nThe c6-square is blocked for the knight\n";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bEJaSmtBWVE,.gif";
      }
      else if (opening.toLowerCase().includes('nimzo')){
        name = "Nimzo-Indian Defense";
        desc ="1.d4 Nf6 2.c4 e6 3.Nc3 Bb4\nThe Nimzo Indian Defense was worked out by Aron Nimzowitsch and played a role in his conception of the center. Each of Black's moves is directed at controlling the d5 and e4 squares with the pieces rather than the pawns. The key move 3...Bb4 pins the white knight on c3 and defines the Nimzo Indian.";
        pros = "Positionally sound\nLeads to rich positions\nBlack develops rapidly\n";
        cons = "White might get the two bishops\nWhite can try to conquer the center\n";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bEIhVGtBMFNiczl6.gif";
      }
      else if (opening.toLowerCase().includes('dutch')){
        name = "Dutch Defense";
        desc ="1.d4 f5\nThe Dutch Defense might look like a reverse version of the Sicilian (1.e4 c5) - since both moves use a wing-pawn to mechanically prevent the creation of the 'perfect pawn center' by White. But due to the king positions, the Dutch is very different. 1...f5 gains space on the kingside at the expense of some weaknesses.";
        pros = "Aggressive\nUnbalancing\nBlack controls e4 while leaving the center-pawns flexible\n";
        cons = "Weakens the king's position\nMight leave holes in the center after a later ...d6 or ...d5\nPotentially blocks the light-squared bishop\n";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bEIxTA,,.gif";
      }
      else if (opening.toLowerCase().includes('trompowsky')){
        name = "Trompowsky Attack";
        desc ="1.d4 Nf6 2.Bg5\nOne of the less usual queen's-pawn openings, the Trompowsky immediately develops the bishop to an active spot, with the intention (usually) to capture on f6 and double Black's pawns.";
        pros = "Aggressive\nLeads to original play\nTricky\n";
        cons = "White may have to give up the two bishops\nBlack can gain time attacking the Bg5\nThe absence of the bishop may weaken the b2 pawn\n";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bEIhVGNN.gif";
      }
      else if (opening.toLowerCase().includes('benko')){
        name = "Benko Gambit";
        desc ="1.d4 Nf6 2.c4 c5 3.d5 b5\nThe Benko Gambit is a special answer to 1.d4 in which Black sacrifices a pawn right off the bat. If White plays 4.cxb5 then 4...a6 usually follows. Black hopes that the open a- and b- files, combined with a fianchettoed king-bishop, will give him great pressure on the queenside.";
        pros = "Unusual positions result\nThe gambit is considered sound\n";
        cons = "White can decline the gambit in various ways\nThere are many different responses for White\nSometimes White can give back the pawn to gain the initiative\n";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bEIhVGtBWUlCSlhI.gif";
      }
      else if (opening.toLowerCase().includes('london')){
        name = "London System";
        desc ="1.d4 d5 2.Nf3 Nf6 3.Bf4\nThe London system is a group of openings which begin with 1.d4, with Bf4 coming soon after and White abstaining from the move c2-c4. This is a rock-solid opening where White develops soundly but modestly.";
        pros = "Hard for Black to get active play\nDifficult for Black to avoid\nA very sound way of getting a playable middlegame\n";
        cons = "Less chance of an attack\nPuts little immediate pressure on Black\nThe Bf4 can be somewhat exposed\n";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bEJaSmd2IVRjRA,,.gif";
      }
      else if (opening.toLowerCase().includes('catalan')){
        name = "Catalan Opening";
        desc ="1.d4 Nf6 2.c4 e6 3.g3\nIn the Catalan, White combines the space-gaining moves d4 and c4 with a fianchetto of the king's bishop. This places the center of gravity of the white pressure on the queenside, while hoping to keep the white king safe in the long-term. ";
        pros = "Positionally subtle\nLeads to long-term pressure\n";
        cons = "The c4 pawn can be vulnerable\nWhite might have to sacrifice a pawn\nBlack can generally avoid the Catalan\n";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bEIhVGtBMFNvdw,,.gif";
      }
      else if (opening.toLowerCase().includes('reti')){
        name = "Réti Opening";
        desc ="1.Nf3\nThis is usually a pretty quiet way to start the game. The knight develops to a good square, and White maintains the flexibility of the central pawns. A later d2-d4 move may transpose to a 1.d4 opening (while avoiding certain lines), while a later c2-c4 move might transpose to the English.";
        pros = "Flexible\nControls e5\nPrepares to castle\n";
        cons = "Blocks the f-pawn\nAllows 1...c5, controlling the d4 square from the side\n";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/Z3Y,.gif";
      }
      else if (opening.toLowerCase().includes('english')){
        name = "English Opening";
        desc ="1.c4\nIn the English Opening, White chooses to fight for the center using a - relatively - wing pawn, as in the Sicilian Defense. The move c4 does not really help to develop a piece, but plans to put the knight behind the c-pawn, thus giving a strong central presence.";
        pros = "Fights for d5\nInvolves the c-pawn in the fight for the center\nCan lead to queenside pressure\n";
        cons = "Slower development\nLess direct attacking chances\nAllows Black to put a strong pawn on e5\n";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/a0E,.gif";
      }
      else if (opening.toLowerCase().includes('queen')){
        if(opening.toLowerCase().includes('gambit')){
        name = "Queen's Gambit";
        desc ="1.d4 d5 2.c4\nOne of the fundamental variations of 1.d4 is the Queen's Gambit. White immediately strikes at Black's central pawn from the side. Although the c4 pawn is not guarded, this is not a 'real' gambit, since White can always get the pawn back if he wants.";
        pros = "Fights to conquer the center\nPuts immediate pressure on Black\nGains space\n";
        cons = "White may have to spend time getting the pawn back\nLess attacking chances on the black king\nBlack may aim to counterattack d4\n";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bEJaSmtB.gif";}
        else{
          name = "Queen's Indian Defense";
        desc ="1.d4 Nf6 2.c4 e6 3.Nf3 b6\nThe Queen's Indian is half of Aron Nimzovitch's conception of the center (the other half being the Nimzo-Indian). White refuses to allow the pin ...Bb4 by playing 3.Nf3, and Black responds by fianchettoing the queen's-bishop - thus fighting for control of the center from a distance.";
        pros = "Black avoids weaknesses\nFluid piece play\nFlexible\n";
        cons = "Drawish\nWhite can maintain a space advantage\nThe Bb7 can sometimes be shut out by d4-d5\n";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bEIhVGtBMFNndlhQ.gif";
        }
      }
      else{
        name = "Bongcloud Attack";
        desc ="1.e4 e5 2.Ke2\nThis opening asserts your dominance against your opponent by giving him the early advantage.";
        pros = "Strikes fear into the heart of the opponent\nDevelops the king for the late game";
        cons ="Gives your opponent a positional advantage\nPrevents castling\nEndangers King\nBlocks Queen and Bishop";
        image = "https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bUMwS2Vt.gif";
      }
      const chesstime = new Discord.MessageEmbed()
        .setTitle(name)
        .setColor('#739654')
        .setDescription(desc)
        .setFooter("Source: chess.com")
        .addField("Pros",pros,false)
        .addField("Cons",cons,false)
        .setImage(image);

        message.channel.send(chesstime);
    }
}