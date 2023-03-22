ASSETSFOLDER=assets/timeline
for mediaFile in `ls $ASSETSFOLDER | grep .mp4`; do
  # cortar a extensão e a resolução do arquivo
  FILENAME=$(echo $mediaFile | sed -n 's/.mp4//p' | sed -n 's/-1920x1080//p')
  INPUT=$ASSETSFOLDER/$mediaFile
  FOLDER_TARGET=$ASSETSFOLDER/$FILENAME
  mkdir -p $FOLDER_TARGET

  #Criar arquivos de resoluções diferentes na pasta
  OUTPUT=$ASSETSFOLDER/$FILENAME/$FILENAME
  DURATION=$(ffprobe -i $INPUT -show_format -v quiet | sed -n 's/duration=//p')

  OUTPUT144=$OUTPUT-$DURATION-144
  OUTPUT360=$OUTPUT-$DURATION-360
  OUTPUT720=$OUTPUT-$DURATION-720

  echo 'rendering in 720'
  
  # a flag -y é pra sobrescrever se já houver algum arquivo na pasta de saída
  # -c:a é o canal de audio e o -ac se refere a quantos canais serão.
  # -vcodec e -acodec é codec de vídeo e codec de audio
  # -ab é o avarage bitRate
  # movflag é a flag muito doida
  # -b:v é o bitRate (velocidade de download)
  # bufsize é o buffer size (tamanho de cada pedaço que será picotado)
  # -vf é o value filter

  ffmpeg -y -i $INPUT \
    -c:a aac -ac 2 \
    -vcodec h264 -acodec aac \
    -ab 128k \
    -movflags frag_keyframe+empty_moov+default_base_moof \
    -b:v 1500k \
    -maxrate 1500k \
    -bufsize 1000k \
    -vf "scale=-1:720" \
    $OUTPUT720.mp4
done
