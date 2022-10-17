# Programme permettant de généré un plateau avec en paramètre :
# L'axe x et y ainsi que la densité d'obstable
# Exemple: `ruby plateau_generator.rb 10 9 1`

# La première ligne du fichier 'plateau' contient les informations pour lire la carte:
# Nombre de lignes du plateau, caractères pour “vide”, “obstacle” et “plein”.
# exemple: 9.xo

def plateau_generator
  File.delete("plateau")
  if ARGV.count != 3
    puts "params needed: x y density"
    exit
  end

  x = ARGV[0].to_i
  y = ARGV[1].to_i
  density = ARGV[2].to_i

  open('plateau', 'a') {|f| f << "#{y}.xo"}
  open('plateau', 'a') {|f| f << "\n"}
  for i in 0..y-1 do
    for j in 0..x do
      open('plateau', 'a') {|f| f << ((rand(y) * 2 < density) ? 'x' : '.')}
    end
    open('plateau', 'a') {|f| f << "\n"}
  end
end

plateau_generator